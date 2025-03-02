import { Container, HStack, Icon, Link, Separator, Stack } from '@chakra-ui/react'
import { SiGithub } from 'react-icons/si'
import { Logo } from './logo'

export const Footer = () => (
  <Container as="footer">
    <Stack
      gap="12"
      alignItems="center"
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      py={{ base: '12', md: '16' }}
    >
      <Logo />
      <Stack gap="6" direction={{ base: 'column', md: 'row' }}>
        {['Portfolio', 'Blog', 'About'].map((link, idx) => (
          <Link key={idx} href={link} colorPalette="gray">
            {link}
          </Link>
        ))}
      </Stack>
      <HStack gap={{ base: '4', md: '3' }}>
        {socialLinks.map(({ href, icon }, index) => (
          <Link key={index} href={href} aria-label={href} color="fg.muted">
            <Icon size="md">{icon}</Icon>
          </Link>
        ))}
      </HStack>
    </Stack>
    <Separator />
    <Stack
      py="6"
      gap={{ base: '4', md: '6' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      justifyContent="center"
    >
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://github.com/jasencdev', icon: <SiGithub /> },
]