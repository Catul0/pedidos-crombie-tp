
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api'
import { useState } from 'react'

require('dotenv').config();

const center = { lat: 48.8584, lng: 2.2945 }

function Maps() {

  const [map, setMaps] = useState<google.maps.Map | null>(null)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    libraries: ['places'],
    
  })
  console.log("estacargado: ", isLoaded)
  if(!isLoaded){
    return <p>Loading...</p>
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
              <Input type='text' placeholder='Origin' />
            </Autocomplete>
            <Autocomplete>
              <Input type='text' placeholder='Destination' />
            </Autocomplete>
            <ButtonGroup>
              <Button colorScheme='pink' type='submit'>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={() => alert(123)}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: </Text>
            <Text>Duration: </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map?.panTo(center)}
            />
          </HStack>
        </Box>
      </Flex>
  )
}

export default Maps
