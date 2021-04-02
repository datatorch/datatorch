// https://github.com/ianstormtaylor/slate/issues/3477#issuecomment-673410433
// @refresh reset

import { Node } from 'slate'
import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'
import { AppNavbar } from '@/common/navbar/AppNavbar'

import { PlugableSlate } from '@/libs/slate'
import { ParagraphPlugin } from '@/libs/slate/plugins/paragraph'
import { HeadingsPlugin } from '@/libs/slate/plugins/headings'
import { EquationsPlugin } from '@/libs/slate/plugins/equations'
import { TweetPlugin } from '@/libs/slate/plugins/tweet'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { DividerPlugin } from '@/libs/slate/plugins/divider'
import { ToolbarPlugin } from '@/libs/slate/plugins/toolbar'
import { CommandsPlugin } from '@/libs/slate/plugins/commands'
import {
  FaFacebook,
  FaHeart,
  FaLink,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { useRouter } from 'next/router'
import { useScrollBarTheme } from '@/libs/hooks/useScrollbarTheme'
import { NextPage } from 'next'

const plugins = [
  HeadingsPlugin(),
  EquationsPlugin(),
  TweetPlugin(),
  DividerPlugin(),
  ToolbarPlugin(),
  CommandsPlugin(),
  ParagraphPlugin()
]

const initValue: Node[] = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum arcu a interdum molestie. Nunc finibus cursus metus iaculis tempor. Sed ornare leo vel risus eleifend, quis euismod diam sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eros purus, feugiat nec lectus eget, maximus semper ex. Proin at felis quis massa dictum sagittis. Nulla efficitur egestas sapien, eu feugiat mauris maximus sit amet. Vivamus in erat dolor. Phasellus feugiat ullamcorper diam, at blandit quam. Phasellus euismod nulla id metus fringilla vehicula.'
      }
    ]
  },
  {
    type: 'paragraph',
    level: 1,
    children: [
      {
        text:
          'Sed sed libero nisi. Ut id lectus quis sem congue lacinia. Ut aliquet sem ac venenatis suscipit. Nulla ut sem fringilla, bibendum lacus eget, accumsan dui. Ut dapibus dignissim velit in efficitur. Sed et faucibus leo. Mauris congue, nisl quis iaculis interdum, eros magna rutrum elit, a iaculis neque orci ac leo. Sed quis diam consequat, porttitor tellus et, cursus urna.'
      },
      {
        type: 'equation',
        content: 'e = mc^2',
        children: [{ text: '' }]
      },
      {
        text: ''
      }
    ]
  },
  {
    type: 'paragraph',
    level: 1,
    children: [
      {
        text:
          'Sed sed libero nisi. Ut id lectus quis sem congue lacinia. Ut aliquet sem ac venenatis suscipit. Nulla ut sem fringilla, bibendum lacus eget, accumsan dui. Ut dapibus dignissim velit in efficitur. Sed et faucibus leo. Mauris congue, nisl quis iaculis interdum, eros magna rutrum elit, a iaculis neque orci ac leo. Sed quis diam consequat, porttitor tellus et, cursus urna.'
      },
      {
        type: 'equation',
        content: 'e = mc^2',
        children: [{ text: '' }]
      },
      {
        text: ''
      }
    ]
  },
  {
    type: 'paragraph',
    level: 1,
    children: [
      {
        text:
          'Sed sed libero nisi. Ut id lectus quis sem congue lacinia. Ut aliquet sem ac venenatis suscipit. Nulla ut sem fringilla, bibendum lacus eget, accumsan dui. Ut dapibus dignissim velit in efficitur. Sed et faucibus leo. Mauris congue, nisl quis iaculis interdum, eros magna rutrum elit, a iaculis neque orci ac leo. Sed quis diam consequat, porttitor tellus et, cursus urna.'
      },
      {
        type: 'equation',
        content: 'e = mc^2',
        children: [{ text: '' }]
      },
      {
        text: ''
      }
    ]
  },
  {
    type: 'heading',
    level: 1,
    children: [{ text: 'Fusce in lacus' }]
  },
  {
    type: 'heading',
    level: 2,
    children: [{ text: 'T123123' }]
  },
  {
    type: 'equation',
    block: true,
    content:
      '\\mathcal{L}_{\\mathcal{T}}(\\vec{\\lambda}) = \\sum_{\\mathbf{x},\\mathbf{s}\\in\\mathcal{T}} \\log P(\\mathbf{x}|\\mathbf{S}) - \\sum_{i=1}^m \\frac{\\lambda_i^2}{2\\sigma^2}',
    children: [{ text: '' }]
  },
  {
    type: 'tweet',
    content: '',
    children: [{ text: '' }]
  }
]

const Title: React.FC<{ project: string }> = ({ project }) => {
  const projectColor = useColorModeValue('gray.500', 'gray.400')
  return (
    <>
      <Text color={projectColor}>{project}</Text>
      <Heading as="h1" fontSize="5xl" fontWeight="bold">
        Title here
      </Heading>
    </>
  )
}

const Article: React.FC<{ projectLayout: boolean }> = ({
  projectLayout,
  children
}) => {
  const isMd = useBreakpointValue({ base: true, lg: false })
  return (
    <Container maxWidth="5xl">
      <Flex flexDirection="row" paddingY={20}>
        {!isMd && (
          <Box
            marginTop={7}
            paddingY={20}
            paddingX={7}
            top="0"
            position="sticky"
            alignSelf="flex-start"
          >
            <IconButton
              marginY={0.5}
              aria-label="favourite"
              colorScheme="red"
              icon={<Icon as={FaHeart} w={5} h={5} />}
              variant="ghost"
            />
            <IconButton
              marginY={0.5}
              colorScheme="gray"
              aria-label="favourite"
              icon={<Icon as={FaLink} w={5} h={5} />}
              variant="ghost"
            />
            <IconButton
              marginY={0.5}
              colorScheme="twitter"
              aria-label="twitter"
              icon={<Icon as={FaTwitter} w={5} h={5} />}
              variant="ghost"
            />
            <IconButton
              marginY={0.5}
              colorScheme="facebook"
              aria-label="facebook"
              icon={<Icon as={FaFacebook} w={5} h={5} />}
              variant="ghost"
            />
            <IconButton
              marginY={0.5}
              colorScheme="linkedin"
              aria-label="linkedin"
              icon={<Icon as={FaLinkedin} w={5} h={5} />}
              variant="ghost"
            />
          </Box>
        )}
        <Box
          flexGrow={1}
          rounded="xl"
          paddingX={{ base: 5, md: projectLayout ? 10 : 20, lg: 20 }}
          paddingY={{ base: 10, md: 20 }}
          overflow="auto"
          bgColor="gray.800"
          fontSize={{ base: 'md', sm: 'lg' }}
        >
          {children}
        </Box>
      </Flex>
    </Container>
  )
}

const Author: React.FC = () => {
  return (
    <Button
      borderRadius="full"
      leftIcon={
        <Avatar
          src="https://bit.ly/sage-adebayo"
          size="xs"
          name="Segun Adebayo"
          ml={-1}
          mr={1}
        />
      }
    >
      Justin Brooks
    </Button>
  )
}

type LayoutProps = {
  children
  projectLayout
  scrollbarCss
}

const Layout: React.FC<LayoutProps> = ({
  children,
  projectLayout,
  scrollbarCss
}) =>
  projectLayout ? (
    <ProjectLayout
      w="full"
      h="full"
      position="relative"
      overflow="auto"
      css={scrollbarCss}
    >
      {children}
    </ProjectLayout>
  ) : (
    <LayoutNavbar navbar={<AppNavbar />}>
      <Box
        w="full"
        h="full"
        position="relative"
        overflow="auto"
        css={scrollbarCss}
      >
        {children}
      </Box>
    </LayoutNavbar>
  )

const ProjectArticles: NextPage = () => {
  const [value, setValue] = useState<Node[]>(initValue)
  const router = useRouter()
  const projectLayout = !((router.query?.fullscreen ?? 'true') === 'true')

  const scrollbarCss = useScrollBarTheme()

  return (
    <Layout projectLayout={projectLayout} scrollbarCss={scrollbarCss}>
      <Article projectLayout={projectLayout}>
        <Title project="Example Project">Title here</Title>
        <Flex alignItems="center" marginY={4}>
          <Box flexGrow={1}>
            <Author />
          </Box>
          <Box>
            <Text color="gray.400">Feb 23</Text>
          </Box>
        </Flex>

        <PlugableSlate
          readOnly={false}
          value={value}
          setValue={v => setValue(v)}
          plugins={plugins}
        />
      </Article>
    </Layout>
  )
}

export default ProjectArticles
