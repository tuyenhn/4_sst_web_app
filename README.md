## 4_sst_web_app

- A Progressive Web Application that will let users interact with the LEDs on the number 4 located at RMIT Vietnam, Building 2, Floor 4.
- Sister project (the code running the LEDs on the number 4 itself): https://github.com/tuyenhn/4_SST_rmit

## Dependencies

- npm 6.14.9
- Tailwind CSS and PostCSS (Installation guide [here](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin))
- [postcss-cli](https://github.com/postcss/postcss-cli)
- [mkcert](https://github.com/FiloSottile/mkcert)

## Want to custom to your own domain?

- Find and open your hosts file ([guide](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/))
- Add at the bottom of the file `127.0.0.1 yourdomain.name`
- In app.py, add `app.config["SERVER_NAME"] = "yourdomain.name:80"` before `app.run()`
- You can have it on ports other than 80, e.g. `"yourdomain.name:5050"`, but you need to have a port if you are using a custom domain name

## Serve over HTTPS locally

- Download an [mkcert](https://github.com/FiloSottile/mkcert/) pre-built binary (or build from source, whichever you like)
- Run `mkcert -install`
- Run `mkcert yourdomain.name`, 2 new files called `yourdomain.name.pem` and `yourdomain.name-key.pem` will be created and copy those 2 files to wherever your project is.
- In your `app.py`, or your Flask app file, add `ssl_context=("path/to/yourdomain.name.pem", "path/to/yourdomain.name-key.pem")` as an `app.run()` parameter
