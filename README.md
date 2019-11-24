# lustforge.com
Source for [LustForge.com](https://lustforge.com)

I've been blogging on WordPress for 8 years now, unfortunately. I've found Wordpress incredibly slow, especially given the content can be made completely static. Luckily the world has taken notice, with the recent [explosion of static blogging frameworks](https://www.staticgen.com/). So, why pay $110/yr for a dedicated WP provider, when you can pay $1/yr to AWS S3?

This repo has the contents of my site as I port it to Hugo. If you like the place, feel free to use the code as an exemplar, however, the blog content is &copy; Joseph Lust 2016.

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
