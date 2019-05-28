class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, presence: true, uniqueness: true
    validates :password, length: {minimum: 10, allow_nil: true}
    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username) || User.find_by(email: username)
        if user && user.is_password?(password)
            return user
        else
            return nil
        end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end
end