import { Box, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'

export const BlogCard = () => {
  return (
    <Card.Root overflow="hidden" variant="elevated" boxShadow="lg">
      <Card.Body gap={{ base: '5', md: '6' }}>
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="sm" fontWeight="medium" color="colorPalette.fg">
              Industry Insights
            </Text>
            <Heading textStyle="2xl">
              The Future of SaaS: Trends to Watch in {new Date().getFullYear()}
            </Heading>
          </Stack>
          <Text color="fg.muted">
            Discover the latest trends in SaaS that are shaping the future of digital solutions and
            how your business can benefit.
          </Text>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <HStack gap="3">
          <Avatar src="https://avatars.githubusercontent.com/u/53586167?v=4" />
          <Box textStyle="sm">
            <Text fontWeight="medium">Esther Adebayo</Text>
            <Text color="fg.muted">January 15, {new Date().getFullYear()}</Text>
          </Box>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}
