"use client"

// Fallback contact system for environments where EmailJS isn't available
export const sendContactMessage = async (formData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // In a real application, you would send this to your backend API
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    timestamp: new Date().toISOString(),
  }

  // Log the contact data (in production, send to your backend)
  console.log("Contact form submission:", contactData)

  // Simulate success/failure
  const isSuccess = Math.random() > 0.1 // 90% success rate for demo

  if (!isSuccess) {
    throw new Error("Failed to send message")
  }

  return { success: true, message: "Message sent successfully!" }
}

// Alternative contact methods
export const contactMethods = {
  email: "raohamza1608@gmail.com",
  phone: "+92 (307) 188 8145",
  linkedin: "https://www.linkedin.com/in/rao-hamza-920a04246/",
  github: "https://github.com/Hamza-160804/",
}

// Contact form validation
export const validateContactForm = (formData) => {
  const errors = {}

  const name = formData.get("name")?.trim()
  const email = formData.get("email")?.trim()
  const subject = formData.get("subject")?.trim()
  const message = formData.get("message")?.trim()

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!subject || subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters long"
  }

  if (!message || message.length < 10) {
    errors.message = "Message must be at least 10 characters long"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
