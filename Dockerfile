# Use official Apache + PHP image
FROM php:8.2-apache

# Copy everything to Apache web directory
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Enable Apache mod_rewrite (optional but good)
RUN a2enmod rewrite headers

# Expose port 80
EXPOSE 80
