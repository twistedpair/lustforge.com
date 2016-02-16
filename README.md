# lustforge.com
Source for [LustForge.com](https://lustforge.com)

I've been blogging on WordPress for 8 years now, unfortunately. I've found Wordpress incredibly slow, especially given the content can be made completely static. Luckily the world has taken noticed, with the recent [explosion of static blogging frameworks](https://www.staticgen.com/). 

This repo has the contents of my site as I port it to Hugo. If you like the place, feel free to use the code as an exemplar, however, the blog content is &copy; Joseph Lust 2016.

# Deployment

```bash
hugo -v -b http://lustforge-cdn.s3-website-us-east-1.amazonaws.com
aws s3 --profile lauf --delete --acl="public-read" --exclude=.git sync public/ s3://lustforge-cdn/
```
