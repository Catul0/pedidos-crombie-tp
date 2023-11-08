import { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';

require('dotenv').config();

const center = { lat: 48.8584, lng: 2.2945 };

function Maps({origin, destination}:any) {
  const router = useRouter()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    libraries: ['places'],
  });

  const [map, setMaps] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>();
  const [duration, setDuration] = useState<string | undefined>('');
  const [distance, setDistance] = useState('');

  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  console.log("estacargado: ", isLoaded);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  async function calculateRoute() {
    if (originRef.current?.value === '' || destinationRef.current?.value === '') {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const request = {
      origin: originRef.current!.value,
      destination: destinationRef.current!.value,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const result = response?.routes[0].legs[0];
        setDirectionsResponse(response);
        if (result?.distance?.text) {
          setDistance(result.distance.text);
        }
        if (result?.duration?.text) {
          setDuration(result.duration.text); // Cambié 'setDistance' a 'setDuration'
        }
        console.log(result);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    if(originRef.current){
      originRef.current.value = ''
    }
    if(destinationRef.current){
      destinationRef.current.value = ''
    }
    router.refresh();
  }
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      className='m-auto h-[80vh] w-[80vw]'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/**GOOGLE MAPS BOX */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMaps(map as google.maps.Map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={4}>
          <Autocomplete>
            <Input type='text' placeholder='Origin' ref={originRef} />
          </Autocomplete>
          <Autocomplete>
            <Input type='text' placeholder='Destination' ref={destinationRef} />
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map?.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Maps;
