RubyLLM.configure do |config|
  config.gemini_api_key = Rails.application.credentials.gemini.api_key
  config.openai_api_key = Rails.application.credentials.open_ai.api_key
  config.deepseek_api_key = Rails.application.credentials.deep_seek.api_key
  # config.anthropic_api_key = Rails.application.credentials.anthropic.api_key

  # # Bedrock
  # config.bedrock_api_key = ENV.fetch('AWS_ACCESS_KEY_ID', nil)
  # config.bedrock_secret_key = ENV.fetch('AWS_SECRET_ACCESS_KEY', nil)
  # config.bedrock_region = ENV.fetch('AWS_REGION', nil)
  # config.bedrock_session_token = ENV.fetch('AWS_SESSION_TOKEN', nil)

  # Set default model to gemini
  config.default_model = 'gemini-2.0-flash'
end
