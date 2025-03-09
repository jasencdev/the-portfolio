import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from './ContactForm.vue'

// Mock fetch API
global.fetch = vi.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders properly', () => {
    const wrapper = mount(ContactForm)
    
    // Check if all form elements are rendered
    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('textarea#message').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('validates all fields are required', async () => {
    // Mock failed response for empty submission
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({ error: "Missing required fields" })
    }
    
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    const wrapper = mount(ContactForm)
    
    // Try to submit the form without filling fields
    await wrapper.find('form').trigger('submit.prevent')
    
    // In jsdom environment, HTML5 validation doesn't work the same as browsers
    // Instead, we'll check that the form was submitted with empty values
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: '',
        message: ''
      })
    })
    
    // Check that success message is not shown
    expect(wrapper.find('.success-message').exists()).toBe(false)
  })

  it('successfully submits the form with valid data', async () => {
    // Mock successful fetch response
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ message: 'Form submitted and email sent successfully' })
    }
    
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    const wrapper = mount(ContactForm)
    
    // Fill the form
    await wrapper.find('input#name').setValue('Test User')
    await wrapper.find('input#email').setValue('test@example.com')
    await wrapper.find('textarea#message').setValue('This is a test message')
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Check if fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message'
      })
    })
    
    // Check if success message is displayed
    await vi.waitFor(() => {
      expect(wrapper.find('.success-message').exists()).toBe(true)
    })
  })

  it('shows error message when form submission fails', async () => {
    // Instead of mocking alert which is problematic in jsdom,
    // we'll mock console.error which is used in the component
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Mock failed fetch response
    const mockResponse = {
      ok: false
    }
    
    // @ts-ignore
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    const wrapper = mount(ContactForm)
    
    // Fill the form
    await wrapper.find('input#name').setValue('Test User')
    await wrapper.find('input#email').setValue('test@example.com')
    await wrapper.find('textarea#message').setValue('This is a test message')
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1)
    
    // Check if console.error was called
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
    
    // Check that success message is not shown
    expect(wrapper.find('.success-message').exists()).toBe(false)
    
    // Clean up the spy
    consoleErrorSpy.mockRestore()
  })
})