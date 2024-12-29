import { useForm, ValidationError } from '@formspree/react'
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
    const [state, handleSubmit] = useForm("mqaaboaw");
    if (state.succeeded) {
        return <p>Thanks for reaching out!</p>;
    }

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
            name="contact" // Form name for Netlify
            method="post"
            onSubmit={handleSubmit}
            action='/'
          >
            {/* Hidden input to store form name */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <Stack gap={{ base: '4', md: '6' }}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name Here"
                />
                <ValidationError
                    prefix='Name'
                    field='name'
                    errors={state.errors}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="Email"
                  name="email"
                  placeholder="your.email@example.com"
                />
                <ValidationError
                    prefix='Email'
                    field='email'
                    errors={state.errors}
                />
              </FormControl>

              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                />
                <ValidationError
                    prefix='Message'
                    field='message'
                    errors={state.errors}
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
              <Button type="submit" colorScheme="blue" disabled={state.submitting}>
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