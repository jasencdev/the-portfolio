import { useState } from 'react';
import { Input, Stack, Textarea } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Button } from './button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './dialog';

export const ContactBlock = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <DialogRoot placement="center" size={{ base: 'cover', md: 'sm' }}>
      <DialogTrigger asChild>
        <Button size="lg">Contact Us</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <Stack gap="1">
            <DialogTitle fontWeight="medium">Let's Start a Conversation</DialogTitle>
            <DialogDescription>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </DialogDescription>
          </Stack>
        </DialogHeader>

        <DialogBody px="6">
          <form
            onSubmit={(e) => e.preventDefault()} // Prevent reload; Netlify will handle the rest
            name="contact" // Form name for Netlify
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field" // Anti-spam honeypot
          >
            {/* Hidden input to store form name */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" /> {/* Honeypot field */}

            <Stack gap={{ base: '4', md: '6' }}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </FormControl>
            </Stack>
          </form>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" colorScheme="gray">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};