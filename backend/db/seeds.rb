# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create a test user
puts 'Creating test user...'
user = User.create!(
  email: 'test@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

# Create sample chats and messages
puts 'Creating sample chats and messages...'

# Project Setup Help thread
chat1 = Chat.create!(
  model_id: 'gemini-2.0-flash',
  owner: user
)

# Add user as participant to the chat
Participant.create!(user: user, chat: chat1)

Message.create!(
  chat: chat1,
  role: 'user',
  content: "Hi, I'm trying to set up a new React project with TypeScript. Can you help me with the initial configuration?",
  model_id: nil,
  user: user
)

Message.create!(
  chat: chat1,
  role: 'assistant',
  content: "I'd be happy to help you set up a React project with TypeScript. You can use Create React App with the TypeScript template by running this command in your terminal: `npx create-react-app my-app --template typescript`\n\nThis will create a new project with all the necessary TypeScript configurations already set up for you.",
  model_id: 'gemini-2.0-flash',
  input_tokens: 24,
  output_tokens: 57
)

Message.create!(
  chat: chat1,
  role: 'user',
  content: "Thanks! That worked. Now I'm wondering what folder structure is recommended for a medium-sized application?",
  model_id: nil,
  user: user
)

Message.create!(
  chat: chat1,
  role: 'assistant',
  content: "For a medium-sized React application, here's a recommended folder structure:\n```\nsrc/\n  components/       # Reusable UI components\n    Button/\n    Form/\n    Layout/\n  pages/            # Page components\n  hooks/            # Custom React hooks\n  services/         # API calls and data services\n  utils/            # Helper functions\n  context/          # React context providers\n  types/            # TypeScript interfaces and types\n  assets/           # Images, fonts, etc.\n  styles/           # Global styles\n```\n\nThis structure keeps your code organized as the application grows. You might want to add more folders based on your specific needs.",
  model_id: 'gemini-2.0-flash',
  input_tokens: 18,
  output_tokens: 122
)

# Debugging API Request Issue thread
chat2 = Chat.create!(
  model_id: 'gemini-2.0-flash',
  owner: user
)

# Add user as participant to the chat
Participant.create!(user: user, chat: chat2)

Message.create!(
  chat: chat2,
  role: 'user',
  content: "I'm getting a CORS error when trying to fetch data from my API. The error says 'Access to fetch at 'http://myapi.com/data' from origin 'http://localhost:3000' has been blocked by CORS policy.' How can I fix this?",
  model_id: nil,
  user: user
)

Message.create!(
  chat: chat2,
  role: 'assistant',
  content: "CORS errors occur when your browser prevents your frontend from making requests to a different domain than the one serving your app. Here are a few solutions:\n\n1. **Backend solution (recommended)**: Configure your API server to include the proper CORS headers. Add these to your server responses:\n   ```\n   Access-Control-Allow-Origin: http://localhost:3000\n   Access-Control-Allow-Methods: GET, POST, PUT, DELETE\n   Access-Control-Allow-Headers: Content-Type\n   ```\n\n2. **Temporary development solution**: Use a proxy in your development environment. If you're using Create React App, add this to your package.json:\n   ```json\n   \"proxy\": \"http://myapi.com\"\n   ```\n   Then change your fetch URLs to relative paths like `/data` instead of `http://myapi.com/data`.\n\nThe first option is better for production environments.",
  model_id: 'gemini-2.0-flash',
  input_tokens: 45,
  output_tokens: 185
)

# State Management Advice thread
chat3 = Chat.create!(
  model_id: 'gemini-2.0-flash',
  owner: user
)

# Add user as participant to the chat
Participant.create!(user: user, chat: chat3)

Message.create!(
  chat: chat3,
  role: 'user',
  content: 'For my React app, should I use Redux, Context API, or something else for state management? The app will have user authentication, theme preferences, and multiple interactive forms.',
  model_id: nil,
  user: user
)

Message.create!(
  chat: chat3,
  role: 'assistant',
  content: "For your use case with authentication, themes, and forms, I recommend using a combination of approaches:\n\n1. **React Context + useReducer**: Great for app-wide states like authentication and theme. It's built into React and sufficient for most apps.\n\n2. **Form Libraries**: For complex forms, consider React Hook Form or Formik rather than managing form state yourself.\n\n3. **Redux**: Only introduce Redux if you anticipate more complex state requirements like caching, undo functionality, or complex data relationships.\n\nStart with Context API for your authentication and theme, as it's simpler to implement and maintain.",
  model_id: 'gemini-2.0-flash',
  input_tokens: 36,
  output_tokens: 106
)

puts 'Seed data created successfully!'
