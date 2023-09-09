
import { Container, Center, Box, Heading, Tag } from '@chakra-ui/react';

function PostDetail() {
  return (
    <Container maxW='1000px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Post Detail</Heading>
          <p>Detail....</p>
          <br />
          <Tag>React</Tag>
        </Box>
      </Center>
    </Container>
  )
}

export default PostDetail;