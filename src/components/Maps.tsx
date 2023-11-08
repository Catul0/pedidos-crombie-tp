import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

require('dotenv').config();

const center = { lat: 48.8584, lng: 2.2945 };

function Maps({ origin, destination }: any) {
  const [map, setMaps] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>();
  const [duration, setDuration] = useState<string | undefined>('');
  const [distance, setDistance] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          const result = response?.routes[0].legs[0];
          setDirectionsResponse(response);
          if (result?.distance?.text) {
            setDistance(result.distance.text);
          }
          if (result?.duration?.text) {
            setDuration(result.duration.text);
          }
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      });
    }
  }, [isLoaded, origin, destination]);

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      className='m-auto h-[80vh] w-[80vw]'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {isLoaded && (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={(map) => setMaps(map)}
          >
            <Marker position={center} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        )}
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
        <Text>Distance: {distance}</Text>
        <Text>Duration: {duration}</Text>
      </Box>
    </Flex>
  );
}

export default Maps;
