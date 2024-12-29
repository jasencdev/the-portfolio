import { Box, Container, HStack, Spacer } from '@chakra-ui/react'
import { Logo } from './logo'
import { MobilePopover } from './mobile-popover'
import { NavbarLinks } from './navbar-links'
import { ContactBlock } from './contact-button'

export const Navbar = () => {
  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      <Container py={{ base: '3.5', md: '4' }}>
        <HStack justify="space-between">
          <Logo />
          <Spacer hideFrom="md" />
          <NavbarLinks hideBelow="md" />
          <ContactBlock />
          <MobilePopover>
            <NavbarLinks />
          </MobilePopover>
        </HStack>
      </Container>
    </Box>
  )
}
