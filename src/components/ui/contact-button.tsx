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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
        elements: {
            name: HTMLInputElement;
            email: HTMLInputElement;
            message: HTMLTextAreaElement;
        };
    };
}

const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
            Object.fromEntries(
                Array.from(formData.entries()).map(([key, value]) => [key, value as string])
            )
        ).toString(),
    })
        .then(() => console.log("Form successfully submitted"))
        .catch((error) => alert(error));
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
          {/* Ensure proper form setup */}
          <form
            data-netlify="true"
            name="contact" // Form name for Netlify
            method="post"
            onSubmit={handleSubmit}
            netlify-honeypot="bot-field" // Anti-spam honeypot
          >
            {/* Hidden input to store form name */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

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

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" colorScheme="gray">
                  Cancel
                </Button>
              </DialogActionTrigger>
              {/* Ensure the button is of type 'submit' */}
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};