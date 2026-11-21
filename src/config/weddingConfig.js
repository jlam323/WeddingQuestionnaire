/**
 * Central configuration for the wedding save-the-date experience.
 * Update the couple's details, photo path, copy, and external link here.
 */
export const weddingConfig = {
  coupleNames: 'Anson & Joyce',
  eyebrow: 'We\'re getting married!',
  landingHeadline: "You're Almost Invited",
  landingMessage:
    'Before we reveal our official Save-The-Date, answer a few quick questions for us.',
  startButtonText: 'Begin',

  // Drop your photo into /public (e.g. /public/couple.jpg) and update this path.
  couplePhotoUrl: '/couple-photo.webp',
  couplePhotoAlt: 'Portrait of the happy couple',

  // External Save-the-Date URL revealed when the guest passes.
  saveTheDateUrl: 'https://withjoy.com/go/c/v1/k1/d0bc5ac5-3511-4450-9589-5c9221ad782d/0/aHR0cHM6Ly93aXRoam95LmNvbS9lY2FyZD9sb29rdXA9ZXlKbFkyRnlaRWxrSWpvaVlqaGxNV1E1TmpRdE1EZzJaQzAwTm1Oa0xXRmpNalF0WVRreE56RmhNREZqWm1WbElpd2ljR1Z5YzI5dVNXUWlPaUpqWldJNVpESTBPUzAxTlRsa0xUVXlaRFV0T0RFMU1pMDFNV1V5TXpRd1ltVXpaaklpTENKbFkyRnlaRlI1Y0dVaU9pSnpZWFpsZEdobFpHRjBaWEJvYjNSdkluMCUzRCZpbnZpdGVlSWQ9Y2ViOWQyNDktNTU5ZC01MmQ1LTgxNTItNTFlMjM0MGJlM2YyJnV0bV9zb3VyY2U9cGx1cy1vbmUtaW52aXRlJnV0bV9tZWRpdW09ZW1haWwmdXRtX2NhbXBhaWduPWd1ZXN0LWVjYXJkJmpveWVtYWlsPXRydWU/yWaVPDrQbJ59LtsWvY1dTw',
  saveTheDateLinkText: 'Open Official Save the Date',

  approvedCopy: {
    eyebrow: 'Invitation Unlocked',
    headline: 'We Can’t Wait to Celebrate With You!',
    message:
      'You passed with flying colors. Follow the link below to view our official Save the Date and wedding details.',
  },

  deniedCopy: {
    eyebrow: 'Invitation Pending',
    headline: 'Not Quite Invited Yet…',
    message: 'YOU FAILED. YOU\'RE UNINVITED',
    retryButtonText: 'Try Again',
  },
};
