---
title: Some Developer Tools I've Created
pubDatetime: 2024-03-18T10:00:00Z
description: Introduces a series of self-developed developer tools, including IEEE754 floating-point conversion, UTF-8 encoding conversion, image processing tools, etc., aimed at solving problems encountered in development and deepening understanding of technical concepts.
draft: true
---

# Some Developer Tools I've Created

In 2020, I quit my job and stayed at home, having plenty of time each day. So, I started developing some development-related tools, aiming to solve problems encountered during development or to help gain a deeper understanding of certain technical concepts.

Writing small tools every day, time passed day by day. Looking back, this experience was actually quite interesting.

At the beginning, the UI of these tools was indeed quite rudimentary. However, as time went on, I continuously improved their appearance. Although they may still not be considered exquisite now, they have made significant progress.

To be honest, these tools have very little user guidance and documentation, more like my own little world. Through Google Analytics data, I found that some tools might only have myself as a user, such as the [micro image hosting](https://devtool.tech/gallery). But precisely because I use them myself, even though the frequency of adding new tools has decreased recently, I have been maintaining them consistently.

What makes me feel gratified is that I submitted some of these tools to Mr. Ruan Yifeng's blog, and many of the small tools received his recommendation. This was a great encouragement for me.

## Some Tools Related to In-depth Principles

These tools are designed to help developers gain a deeper understanding of some basic concepts and underlying principles.

### [IEEE754 Floating-Point Conversion](https://devtool.tech/double-type)

This tool can help you understand the internal representation of double-precision floating-point numbers in the IEEE 754 standard. It can convert decimal numbers to their corresponding binary representation, clearly showing the sign bit, exponent bits, and mantissa bits. This is very helpful for understanding how computers handle floating-point numbers.

According to the [IEEE754](https://en.wikipedia.org/wiki/IEEE_754) standard, the floating-point conversion for `Infinity` is: all exponent bits are 1, all mantissa bits are 0.

Here's the floating-point conversion for Infinity:

![Floating-point conversion for Infinity](https://static.shanyue.tech/images/24-10-13/clipboard-4215.a7ecb1.webp)

According to the [IEEE754](https://en.wikipedia.org/wiki/IEEE_754) standard, the floating-point conversion for `0` is: sign bit is 0, all exponent bits are 0, all mantissa bits are 0.

Here's the floating-point conversion for 0:

![Floating-point conversion for 0](https://static.shanyue.tech/images/24-10-13/clipboard-0806.71aa99.webp)

### [UTF-8 Encoding Conversion](https://devtool.tech/utf8)

UTF-8 is a variable-length character encoding. This tool can help you understand how Unicode characters are encoded into UTF-8. You can input any Unicode character, and the tool will display its UTF-8 encoded binary representation, allowing you to visually see the encoding process.

![UTF-8 encoding conversion example](https://static.shanyue.tech/images/24-10-16/clipboard-9015.e279b0.webp)

### [Base64 Encoding Conversion](https://devtool.tech/base64)

Base64 is a commonly used encoding method, especially when dealing with binary data. This tool not only helps you understand the principles of Base64 encoding but also provides convenient encoding and decoding functions. It is particularly useful for scenarios where binary data needs to be transmitted in a text environment.

![Base64 encoding conversion example](https://static.shanyue.tech/images/24-10-16/clipboard-2684.f3dea6.webp)

### [File Type Detection](https://devtool.tech/filetype)

This tool can help you understand how to determine file types through file magic numbers. You can upload a file, and the tool will read the binary data of the file and determine the file type based on the magic number. This is very useful when dealing with unknown files or verifying file types.

For example, `JPEG` is identified because its Magic Number is `FF D8 FF DB`

![File type detection example](https://static.shanyue.tech/images/24-10-16/clipboard-4722.45bad5.webp)

## Image Related

Image processing is an important aspect of Web development. Here are some tools related to image processing.

### [Micro Image](https://devtool.tech/tiny-image)

This is a fast image compression tool that can help you reduce the size of image files without significantly reducing image quality.

It supports various image formats and has no limitations on file size or quantity. This tool is particularly helpful for optimizing website loading speed.

Most importantly, it is implemented using frontend technologies, requiring no server costs, so you don't need to worry about privacy issues. Its implementation is similar to [squoosh](https://squoosh.app/), both leveraging [WebAssembly](https://webassembly.org/).

![Micro Image example](https://static.shanyue.tech/images/24-10-16/clipboard-5192.d4318d.webp)

### [Micro Image Hosting](https://devtool.tech/gallery)

This is a personal image hosting tool that allows you to use a GitHub repository as your personal image host. It provides simple upload and management functions, making it convenient for you to reference images in articles or web pages. This is a very practical tool for developers who frequently need to share images online.

![Micro Image Hosting example](https://static.shanyue.tech/images/24-10-16/clipboard-3754.4cf7fe.webp)

### [Image Share](https://devtool.tech/image-share)

This tool can help you quickly generate images with text, suitable for social media sharing or creating simple posters. It simplifies the process of combining text and images, allowing you to create attractive images without using complex image editing software.

![Image Share example](https://static.shanyue.tech/images/24-10-16/clipboard-0477.a2915f.webp)

### [Image Placeholder](https://devtool.tech/placeholder)

This is an image placeholder generator tool that can quickly create custom-sized and colored placeholder images, very suitable for use during the development process. It can help you maintain the integrity of page layout when actual images are not yet ready.

![Image Placeholder example](https://static.shanyue.tech/images/24-10-16/clipboard-0895.d25b6d.webp)

## Encoding and Encryption

In Web development, we often need to deal with various encodings and encryptions. Here are some related tools:

### [URL Encoding](https://devtool.tech/url-encode)

This tool can help you perform URL encoding and decoding, which is very useful for handling URLs containing special characters. It can ensure that your URLs are correctly transmitted and parsed in various environments.

### [HTML Entity Encoding](https://devtool.tech/entity)

The HTML entity encoding tool can help you convert special characters to HTML entities, ensuring they display correctly in HTML. This is important for preventing XSS attacks and ensuring correct rendering of HTML documents.

### [Hash Generator](https://devtool.tech/hash)

This tool can generate various commonly used hash values, including MD5, SHA1, SHA256, etc. It is very useful in scenarios such as data integrity verification and password storage.

## Color Tools

Color is an important element in Web design. Here are some color-related tools:

### [Color Conversion](https://devtool.tech/color)

This tool can convert between different color models such as RGB, HSL, CMYK, etc. It can help designers and developers switch freely between different color representation methods.

![Color Conversion example](https://static.shanyue.tech/images/24-10-16/clipboard-7410.0bff76.webp)

### [Palette Generator](https://devtool.tech/palette)

This tool can help you generate tints and shades of colors, very suitable for creating consistent color themes. It allows you to quickly build harmonious color schemes, improving design efficiency.

![Palette Generator example](https://devtool.tech/api/placeholder/800/300)

### [Contrast Ratio Calculator](https://devtool.tech/contrast-ratio)

This tool can calculate the contrast ratio between two colors, helping you ensure the readability of text on backgrounds. It is very important for creating designs that meet accessibility standards.

![Contrast Ratio Calculator example](https://static.shanyue.tech/images/24-10-16/clipboard-2432.3b8755.webp)

## Conclusion

Although some tools might only be used by myself, it is this continuous process of learning and creation that makes me feel fulfilled and happy.

I will continue to maintain and improve these tools, and welcome everyone to use them and provide feedback.
