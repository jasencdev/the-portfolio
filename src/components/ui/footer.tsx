import { Container, HStack, Icon, Link, Separator, Stack } from '@chakra-ui/react'
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin, SiX } from 'react-icons/si'
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
      <Logo height="32" />
      <Stack gap="6" direction={{ base: 'column', md: 'row' }}>
        {['Main', 'Portfolio', 'Blog', 'About'].map((link, idx) => (
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
      <HStack gap="6">
        {['Privacy Policy', 'Terms of Service', 'License Agreement'].map((link, idx) => (
          <Link key={idx} href={link} textStyle="sm" variant="underline" colorPalette="gray">
            {link}
          </Link>
        ))}
      </HStack>
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://facebook.com', icon: <SiFacebook /> },
  { href: 'https://www.instagram.com', icon: <SiInstagram /> },
  { href: 'https://www.linkedin.com', icon: <SiLinkedin /> },
  { href: 'https://github.com', icon: <SiGithub /> },
  { href: 'https://x.com', icon: <SiX /> },
]