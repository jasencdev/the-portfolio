import { Link, Stack, type StackProps } from '@chakra-ui/react'

export const NavbarLinks = (props: StackProps) => {
  // Define the navigation items and their corresponding hrefs
  const navItems = [
    { label: 'Main', href: '/' },
    { label: 'Portfolio', href: '/Portfolio' },
    { label: 'Blog', href: '/Blog' },
    { label: 'About', href: '/About' },
  ]

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href} // Add the href to the link
          fontWeight="medium"
          color="fg.muted"
          _hover={{
            color: 'colorPalette.fg',
            textDecoration: 'none',
          }}
        >
          {label}
        </Link>
      ))}
    </Stack>
  )
}