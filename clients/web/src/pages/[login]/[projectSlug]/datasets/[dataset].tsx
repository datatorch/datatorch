import React from 'react'
import { NextPage } from 'next'
import { ProjectLayout } from '@/applets/projects/layout/ProjectLayout'
import { ProjectHeader } from '@/applets/projects/ProjectPage'
import { UploadModal } from '@/applets/projects/datasets/UploadModal'
import { DeleteFileModal } from '@/applets/projects/datasets/DeleteFileModal'
import { FilterPopover } from '@/applets/projects/datasets/FilterPopover'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text
} from '@chakra-ui/react'
import {
  FaCheck,
  FaCheckDouble,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaFile,
  FaForward,
  FaSearch
} from 'react-icons/fa'
import { Card } from '@/common/Card'

const ProjectDataset: NextPage = () => {
  return (
    <ProjectLayout>
      <Container maxWidth="7xl">
        <ProjectHeader title="Vars-23S" />

        <Box marginBottom={6}>
          <Text color="gray.400">Description about the dataset goes here.</Text>
          <Box>
            <Tag variant="subtle" mr={2} my={1} colorScheme="blue">
              png
            </Tag>
            <Tag variant="subtle" mr={2} my={1} colorScheme="blue">
              multi-sensor
            </Tag>
            <Tag variant="subtle" mr={2} my={1} colorScheme="blue">
              tiff
            </Tag>
            <Tag variant="subtle" mr={2} my={1} colorScheme="blue">
              segmentation
            </Tag>
          </Box>
        </Box>

        <Card padding={0}>
          <Flex padding={2}>
            <Checkbox marginRight={3}></Checkbox>
            <InputGroup variant="filled" size="sm">
              <InputLeftElement color="gray.300" pointerEvents="none">
                <Icon as={FaSearch} />
              </InputLeftElement>
              <Input placeholder="Filter files" />
            </InputGroup>

            <FilterPopover />
            <UploadModal />
            <DeleteFileModal />
          </Flex>

          <Divider />

          <Box paddingY={1}>
            <Flex
              paddingLeft={3}
              paddingRight={4}
              paddingY={1}
              alignItems="center"
              cursor="pointer"
              _hover={{ bgColor: 'gray.700' }}
            >
              <Checkbox marginRight={3} flexShrink={0} />
              <Icon as={FaFile} flexShrink={0} />
              <Text flexGrow={1} marginLeft={2} isTruncated>
                File name here.jpg
              </Text>
              <Box textAlign="center" flexShrink={0} w={70}>
                <Tag colorScheme="green">
                  <Icon as={FaCheck} />
                </Tag>
                <Tag colorScheme="green">
                  <Icon as={FaCheckDouble} />
                </Tag>
              </Box>
              <Text
                w={70}
                textAlign="right"
                flexShrink={0}
                marginLeft={3}
                color="gray.400"
              >
                999.9 MB
              </Text>
            </Flex>
            <Flex
              paddingLeft={3}
              paddingRight={4}
              paddingY={1}
              alignItems="center"
              cursor="pointer"
              _hover={{ bgColor: 'gray.700' }}
            >
              <Checkbox marginRight={3} flexShrink={0} />
              <Icon as={FaFile} flexShrink={0} />
              <Text flexGrow={1} marginLeft={2} isTruncated>
                File name here.jpg
              </Text>
              <Box textAlign="center" flexShrink={0} w={70}>
                <Tag>
                  <TagLeftIcon as={FaForward} />
                  <TagLabel>4</TagLabel>
                </Tag>
              </Box>
              <Text
                w={70}
                textAlign="right"
                flexShrink={0}
                marginLeft={3}
                color="gray.400"
              >
                999.9 MB
              </Text>
            </Flex>
            <Flex
              paddingLeft={3}
              paddingRight={4}
              paddingY={1}
              alignItems="center"
              cursor="pointer"
              _hover={{ bgColor: 'gray.700' }}
            >
              <Checkbox marginRight={3} flexShrink={0} />
              <Icon as={FaFile} flexShrink={0} />
              <Text flexGrow={1} marginLeft={2} isTruncated>
                File name here.jpg
              </Text>
              <Box textAlign="center" flexShrink={0} w={70}>
                <Tag colorScheme="red">
                  <TagLeftIcon as={FaExclamationTriangle} />
                  <TagLabel>4</TagLabel>
                </Tag>
              </Box>
              <Text
                w={70}
                textAlign="right"
                flexShrink={0}
                marginLeft={3}
                color="gray.400"
              >
                999.9 MB
              </Text>
            </Flex>
          </Box>
        </Card>

        <Flex justifyContent="center" marginTop="3" color="gray.300">
          <Button
            leftIcon={<Icon as={FaChevronLeft} />}
            size="sm"
            marginX="2"
            variant="ghost"
            isDisabled
          >
            Previous
          </Button>
          <Button
            rightIcon={<Icon as={FaChevronRight} />}
            size="sm"
            marginX="2"
            variant="ghost"
          >
            Next
          </Button>
        </Flex>
      </Container>
    </ProjectLayout>
  )
}

export default ProjectDataset
