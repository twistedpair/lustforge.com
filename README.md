# lust.dev
Source for [lust.dev](https://lust.dev)

I've been blogging on WordPress since 2008, unfortunately. I've found Wordpress incredibly slow, especially given the content can be made completely static. Luckily the world has taken notice, with the recent [explosion of static blogging frameworks](https://www.staticgen.com/). So, why pay $110/yr for a dedicated WP provider, when you can pay ~$1/yr to AWS S3~ $0 to host on GitHub pages?

This repo has the contents of my site as I port it to Hugo. If you like the place, feel free to use the code as an exemplar, however, the blog content is &copy; Joseph Lust 2020.

This site is hosted on [GitHub Pages](https://pages.github.com/).

# Local Building

```bash
git clone git@github.com:twistedpair/lustforge.com.git
# We fixed some of the Hugo themes
git submodule update --init --recursive
```

# Local live development

Startup the live Hugo server

```bash
hugo server -D -w
```

# Deployment

This site uses [GitHub Actions](https://github.com/actions) to deploy. Just merge to `master` and it will be deployed to [GitHub Pages](https://pages.github.com/).

Deployment workflow can be found [here](.github/workflows/build-deploy-site.yml)

To use this workflow, you'll need to add the following secrets to your cloning repo:

- `ACTIONS_DEPLOY_KEY` (repo deployer key with write permission)


# FAQ

Why is your site so insecure, not offering HSTS headers in this day and age? Unfortunately GitHub pages [still doesn't offer](https://github.com/isaacs/github/issues/1249) standard security options to protect its authors and readers, resulting in [poor security scores](https://observatory.mozilla.org/analyze/lust.dev). I continue to hold out hope GitHub adds this feature soon, so the domain can go on the preload list. :crying_cat_face: 
