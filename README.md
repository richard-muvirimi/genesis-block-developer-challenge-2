# Genesis Block Developer Challenge 2

### Installation

1. Clone repository from git
```sh
git clone https://github.com/richard-muvirimi/genesis-block-developer-challenge-2.git
```

2. Install composer dependencies, will auto handle npm as well
```sh
composer install
```

3. If the above failed to install npm dependencies
```sh
npm i
```

4. Create database tables (Optionally inport sql dump file 'Genesis_2.sql')
```sh
php artisan migrate
```

5. Create and edit `.env` file to match your environment
```sh
composer run post-root-package-install
```

### API Documentation

![API Documentation](/screenshots/Screenshot_1.png)

Once setup, you can access the api documentation at `/documentation`

