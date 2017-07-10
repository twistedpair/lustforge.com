# lustforge.com
Source for [LustForge.com](https://lustforge.com)

I've been blogging on WordPress for 8 years now, unfortunately. I've found Wordpress incredibly slow, especially given the content can be made completely static. Luckily the world has taken notice, with the recent [explosion of static blogging frameworks](https://www.staticgen.com/). So, why pay $110/yr for a dedicated WP provider, when you can pay $1/yr to AWS S3?

This repo has the contents of my site as I port it to Hugo. If you like the place, feel free to use the code as an exemplar, however, the blog content is &copy; Joseph Lust 2016.

# Deployment

See [deploy_site.sh](deploy_site.sh) or the below example.

```bash
hugo -v 

# Copy over pages - not static js/img/css/downloads
aws s3 sync --profile lauf --acl "public-read" --sse "AES256" public/ s3://lustforge-cdn/ --exclude 'img' --exclude 'js' --exclude 'downloads' --exclude 'css'

# Ensure static files are set to cache forever - cache for a month --cache-control "max-age=2592000"
aws s3 sync --profile lauf --acl "public-read" --sse "AES256" public/img/ s3://lustforge-cdn/img/
aws s3 sync --profile lauf --acl "public-read" --sse "AES256" public/css/ s3://lustforge-cdn/css/
aws s3 sync --profile lauf --acl "public-read" --sse "AES256" public/js/ s3://lustforge-cdn/js/

# Downloads binaries, not part of repo - cache at edge for a year --cache-control "max-age=31536000"
aws s3 sync --profile lauf --acl "public-read" --sse "AES256"  static/downloads/ s3://lustforge-cdn/downloads/
```


