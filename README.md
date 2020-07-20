# Fastify Boilerplate

> A full-blown production-ready deployable API server. The goal of this boilerplate is to help the beginners to reach at least a mediocre level.

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

There are many great NodeJS API development boilerplates available on GitHub, however, I didn't find one that really suits my needs so I created this enhanced one. I want to create a boilerplate so amazing that it'll be the last one you ever need.

Here's why:

- Your time should be focused on building the APIs from the minute you start writing the code for your brand new project rather than investing time in setting it up with **good** practices and basic **essentials** built-in that help you make the development process easy.
- You shouldn't be doing the same tasks over and over like creating a project from scratch

Of course, no one boilerplate will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

A list of **nuts and bolts** which are built-in to kick-start your API development.

- API contract definitions for request and response using JSON schema.
- Request Body Validation (like required fields, string, boolean, email, etc... formats) to catch most of the bad requests at an early stage.
- Centralized Error Handler with the flexibility to add custom error with clear message and status codes [~~Must be integrated with at least one Error Monitoring tool like sentry~~]
- Auto-generated Swagger Documentation using API contract definitions
- [~~A switch to pick one of multiple integrated Email As A Service Providers~~.]
- HTTPS-enabled (option for enabling it).
- Easily configurable SQL connector (knex query builder)
- Facilitating the ability to add database migrations and to seed data.
- Formatted logging functionality for tracing the errors in a better way.
- Tuned eslint and prettier configurations for better code linting and formatting.
- Well configured HTTP client to propagate external API calls.
- Monitoring the API request with Prometheus and grafana dashboards.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## CI

We are using GitHub actions for testing and linting our code.

## Built With

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework, for Node.js
- [Knex](http://knexjs.org/) - "batteries included" SQL query builder
- [Pino](https://www.npmjs.com/package/pino) - Very low overhead Node.js logger.

## Authors

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Hat tip to anyone whose code was useds

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/mattaharish/fastify-boilerplate.svg?style=flat-square&color=green
[contributors-url]: https://github.com/mattaharish/fastify-boilerplate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mattaharish/fastify-boilerplate?style=flat-square
[forks-url]: https://github.com/mattaharish/fastify-boilerplate/network/members
[stars-shield]: https://img.shields.io/github/stars/mattaharish/fastify-boilerplate?style=flat-square
[stars-url]: https://github.com/mattaharish/fastify-boilerplate/stargazers
[issues-shield]: https://img.shields.io/github/issues/mattaharish/fastify-boilerplate?style=flat-square
[issues-url]: https://github.com/mattaharish/fastify-boilerplate/issues
[license-shield]: https://img.shields.io/github/license/mattaharish/fastify-boilerplate?style=flat-square
[license-url]: https://github.com/mattaharish/fastify-boilerplate/blob/master/LICENSE
