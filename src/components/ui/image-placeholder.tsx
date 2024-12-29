import { Center, type CenterProps, Image } from '@chakra-ui/react'

export const ImagePlaceholder = (props: CenterProps) => (
  <Center w="full" h="full" bg="bg.muted" color="fg.subtle" {...props}>
    <Image alt='jasenc.dev logo' src='./assets/207250834_padded_logo.png' rounded="lg"/>
  </Center>
)
