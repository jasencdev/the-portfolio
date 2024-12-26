import {
    Badge,
    Box,
    Container,
    Flex,
    Float,
    HStack,
    Icon,
    SimpleGrid,
    Span,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import {
    LuBadgeCheck,
    LuCheckCheck,
    LuMapPin,
    LuMedal,
    LuMessageCircle,
    LuStar,
  } from 'react-icons/lu'
  import { Avatar } from './ui/avatar'
  
  export const Profile = () => {
    return (
      <Container py="20" maxW="2xl">
        <Stack gap="8">
          <Flex gap="8">
            <Avatar
              name={data.name}
              src={data.image}
              css={{ '--avatar-size': 'sizes.28', '--avatar-font-size': 'fontSizes.3xl' }}
            >
              <Float
                offset="4"
                placement="bottom-end"
                boxSize="10"
                layerStyle="fill.solid"
                rounded="full"
              >
                <Icon rounded="full" size="md">
                  <LuBadgeCheck />
                </Icon>
              </Float>
            </Avatar>
  
            <Stack flex="1">
              <HStack>
                <Text textStyle="xl" fontWeight="semibold">
                  {data.name}
                </Text>
                <Text textStyle="sm" color="fg.muted">
                  @{data.username}
                </Text>
              </HStack>
  
              <HStack columnGap="6" rowGap="2" textStyle="sm" wrap="wrap">
                <HStack gap="1">
                  <LuStar />
                  <Span fontWeight="medium">{data.rating}</Span>
                  <Span color="fg.muted">({data.ratingCount})</Span>
                </HStack>
  
                <HStack gap="1" color="fg.muted">
                  <LuMapPin />
                  {data.location}
                </HStack>
  
                <Badge colorPalette="orange">
                  <LuMedal /> Top Rated
                </Badge>
              </HStack>
  
              <Text color="fg.muted">{data.title}</Text>
  
              <HStack gap="6" textStyle="sm">
                <HStack gap="1">
                  <LuMessageCircle />
                  {data.language}
                </HStack>
              </HStack>
            </Stack>
          </Flex>
  
          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              About
            </Text>
            <Box>{data.description}</Box>
          </Stack>
  
          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              Skills
            </Text>
            <SimpleGrid gap="4" columns={2}>
              {data.skills.map((skill) => (
                <HStack key={skill} flex="1">
                  <Icon color="colorPalette.fg">
                    <LuCheckCheck />
                  </Icon>
                  {skill}
                </HStack>
              ))}
            </SimpleGrid>
          </Stack>

          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              Languages
            </Text>
            <HStack wrap="wrap">
              {data.languages.map((software) => (
                <Badge key={software} size="lg" variant="outline" colorPalette="gray">
                  {software}
                </Badge>
              ))}
            </HStack>
          </Stack>

          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              Language Frameworks
            </Text>
            <HStack wrap="wrap">
              {data.software_frameworks.map((software) => (
                <Badge key={software} size="lg" variant="outline" colorPalette="gray">
                  {software}
                </Badge>
              ))}
            </HStack>
          </Stack>
  
          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              Softwares
            </Text>
            <HStack wrap="wrap">
              {data.softwares.map((software) => (
                <Badge key={software} size="lg" variant="outline" colorPalette="gray">
                  {software}
                </Badge>
              ))}
            </HStack>
          </Stack>

          <Stack gap="4">
            <Text textStyle="sm" fontWeight="semibold">
              Data Frameworks
            </Text>
            <HStack wrap="wrap">
              {data.data_frameworks.map((software) => (
                <Badge key={software} size="lg" variant="outline" colorPalette="gray">
                  {software}
                </Badge>
              ))}
            </HStack>
          </Stack>

        </Stack>
      </Container>

      
    )
  }
  
  const data = {
    name: 'Jasen C.',
    location: 'Philadelphia, PA',
    language: 'English',
    username: 'jasencarroll',
    rating: 4.5,
    ratingCount: 140,
    topRated: true,
    image: 'https://avatars.githubusercontent.com/u/108644550?v=4',
    title: 'Entrepreneur & Developer',
    description:
      'Mechanical Engineer, Architect, & Developer with over 10 years of experience. Leading Quality Engineering with combination products at PCI.',
    skills: ['UI/UX Design', 'Frontend Development', 'User Requirements', 'Design Systems', 'Figma', 'Full Stack Development', 'Backend Development', 'Data Science'],
    languages: [
      'C++',
      'Python',
      'Ruby',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Markdown',
    ],
    software_frameworks: [
      'Flask',
      'Django',
      'PostgreSQL',
      'Psychopg2',
      'Rails',
      'Sinatra',
      'Jekyll',
      'React',
      'Chakra UI',
      'Vite',
      'Astro',
      'Express',
    ],
    softwares: [
      'Figma',
      'VS Code',
      'Docker',
      'Webflow',
      'Zeplin',
      'InVision',
      'Principle',
      'Framer',
      'Abstract',
    ],
    data_frameworks: [
      'Pandas',
      'NumPy',
      'Docker',
      'Webflow',
      'Zeplin',
      'InVision',
      'Principle',
      'Framer',
      'Abstract',
    ],
  }
  