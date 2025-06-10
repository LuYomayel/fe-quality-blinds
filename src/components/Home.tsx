"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Configuración de scroll suave
// const smoothScroll = (
//   e: React.MouseEvent<HTMLAnchorElement>,
//   targetId: string
// ) => {
//   e.preventDefault();
//   const element = document.getElementById(targetId);
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// };

const featuredCollections = [
  {
    name: "Roller Blinds",
    image: "/images/roller-blind-1.webp",
    description:
      "Elegant and functional, perfect for any space. Custom-made roller blinds with superior light control and privacy options.",
    link: "/blinds/roller/blockout-roller-blinds",
    category: "Blinds",
  },
  {
    name: "Roman Blinds",
    image: "/images/roman-blind-1.webp",
    description:
      "Classic and sophisticated, ideal for elegant interiors. Premium fabric Roman blinds with precise tailoring.",
    link: "/blinds/roman/blockout-roman-blinds",
    category: "Blinds",
  },
  {
    name: "Venetian Blinds",
    image: "/images/venetian-blind-1.webp",
    description:
      "Versatile and durable, complete light control. Aluminium and timber venetian blinds for modern homes.",
    link: "/blinds/venetian/aluminium-venetian-blinds",
    category: "Blinds",
  },
  {
    name: "Curtains",
    image: "/images/curtain-1.webp",
    description:
      "High-quality fabrics for an elegant touch. Custom curtains and drapes with professional installation.",
    link: "/curtains/blockout-curtains",
    category: "Curtains",
  },
  {
    name: "Shutters",
    image: "/images/shutter-1.webp",
    description:
      "Permanent and elegant solutions for your windows. Timber and ABS shutters with lifetime warranties.",
    link: "/shutters/abs-shutters",
    category: "Shutters",
  },
  {
    name: "Awnings",
    image: "/images/awning-1.webp",
    description:
      "Stylish exterior sun protection. Retractable and fixed awnings for outdoor living spaces.",
    link: "/awnings/conservatory-awnings",
    category: "Awnings",
  },
];

// Datos de proyectos
const projectCategories = [
  {
    name: "BUILDERS",
    image: "/images/projects/builders.jpg",
    description: "Custom solutions for residential and commercial builders",
  },
  {
    name: "SCHOOLS",
    image: "/images/projects/schools.jpg",
    description:
      "Safe and durable window treatments for educational facilities",
  },
  {
    name: "UNIVERSITIES",
    image: "/images/projects/universities.jpg",
    description: "Professional installations for higher education campuses",
  },
  {
    name: "ARCHITECTS/DESIGNERS",
    image: "/images/projects/architects.jpg",
    description: "Collaborative solutions with design professionals",
  },
  {
    name: "HOSPITALS",
    image: "/images/projects/hospitals.jpg",
    description: "Healthcare-compliant window treatments",
  },
  {
    name: "OTHER PROJECTS",
    image: "/images/projects/other.jpg",
    description: "Diverse commercial and specialty installations",
  },
];

// Datos de testimonios - Agregando más reseñas para el slider
const customerTestimonials = [
  {
    name: "Jackis aray",
    date: "2021-09-28",
    rating: 5,
    review: "A good quality blinds showroom",
    avatar: "J",
  },
  {
    name: "Christine Spoeljar",
    date: "2021-03-15",
    rating: 5,
    review:
      "Awesome service!! We have an Issey outdoor roller blind which is still going after 11years however it started to not hold. We contacted Quality Blinds who came out twice to replac...",
    avatar: "C",
  },
  {
    name: "Anna MB",
    date: "2021-05-07",
    rating: 5,
    review:
      "So happy with our order from Quality Blinds! From quote through to install they helped us find the solution we were looking for. Great quality and great service - thank you!",
    avatar: "A",
  },
  {
    name: "Paddo Performance",
    date: "2021-08-02",
    rating: 5,
    review:
      "We needed blinds installed quite urgently to our physiotherapy clinic. I had sent it to over 10 different places and Nick from Quality Blinds got back to me immediately a...",
    avatar: "P",
  },
  {
    name: "Bradley Michael",
    date: "2021-07-23",
    rating: 5,
    review:
      "Quality Blinds is the best blinds company we have used the price and quality of the product was the the best we have had. Service they delivered before they said they...",
    avatar: "B",
  },
  {
    name: "Sarah Johnson",
    date: "2021-06-15",
    rating: 5,
    review:
      "Outstanding customer service! The team helped us choose the perfect blinds for our new home. Installation was flawless and the quality is exceptional. Highly recommended!",
    avatar: "S",
  },
  {
    name: "Mike Chen",
    date: "2021-04-22",
    rating: 5,
    review:
      "Professional service from start to finish. Great quality products and the installation team was punctual and clean. Very satisfied with our new Roman blinds.",
    avatar: "M",
  },
  {
    name: "Lisa Thompson",
    date: "2021-05-30",
    rating: 5,
    review:
      "Fantastic experience with Quality Blinds! They provided excellent advice, competitive pricing, and the finished result exceeded our expectations.",
    avatar: "L",
  },
  {
    name: "David Wilson",
    date: "2021-03-08",
    rating: 5,
    review:
      "Top-notch service and product quality. The consultation was thorough and the installation team was professional. Our venetian blinds look amazing!",
    avatar: "D",
  },
  {
    name: "Emma Roberts",
    date: "2021-07-12",
    rating: 5,
    review:
      "Couldn't be happier with our new shutters! Quality Blinds delivered exactly what they promised. Great value for money and excellent craftsmanship.",
    avatar: "E",
  },
];

// Datos de marcas
const brandPartners = [
  {
    name: "ACMEDA",
    logo: "/images/brands/acmeda.png",
    description: "Premium window covering solutions",
    link: "/brands/acmeda",
  },
  {
    name: "ALUXOR",
    logo: "/images/brands/aluxor.png",
    description: "Innovative awning systems",
    link: "/brands/aluxor",
  },
  {
    name: "Carbolite",
    logo: "/images/brands/carbolite.png",
    description: "Quality awnings & louvres",
    link: "/brands/carbolite",
  },
  {
    name: "ESR Blinds",
    logo: "/images/brands/esr-blinds.png",
    description: "Professional blind solutions",
    link: "/brands/esr-blinds",
  },
  {
    name: "FOREST",
    logo: "/images/brands/forest.png",
    description: "Drapery hardware specialists",
    link: "/brands/forest",
  },
];

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Estados simplificados para carruseles infinitos
  const [currentCollection, setCurrentCollection] = React.useState(0);
  const [currentProject, setCurrentProject] = React.useState(0);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [currentBrand, setCurrentBrand] = React.useState(0);

  // Referencias para los carruseles
  const collectionsRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);
  const brandsRef = React.useRef<HTMLDivElement>(null);

  // Crear arrays infinitos duplicando elementos para efecto continuo
  const infiniteCollections = [
    ...featuredCollections,
    ...featuredCollections,
    ...featuredCollections,
  ];
  const infiniteProjects = [
    ...projectCategories,
    ...projectCategories,
    ...projectCategories,
  ];
  const infiniteBrands = [...brandPartners, ...brandPartners, ...brandPartners];

  // Auto-play para colecciones - movimiento infinito suave
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollection((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play para proyectos - movimiento infinito suave
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Auto-play para testimonios - sin cambios, ya funciona bien
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === customerTestimonials.length - 1 ? 0 : prev + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play para brands - movimiento infinito suave
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrand((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Efecto para resetear posición cuando se completa un ciclo (sin animación visible)
  React.useEffect(() => {
    if (currentCollection >= featuredCollections.length * 2) {
      setTimeout(() => {
        if (collectionsRef.current) {
          collectionsRef.current.style.transition = "none";
          setCurrentCollection(featuredCollections.length);
          setTimeout(() => {
            if (collectionsRef.current) {
              collectionsRef.current.style.transition =
                "transform 0.8s ease-in-out";
            }
          }, 50);
        }
      }, 50);
    }
  }, [currentCollection]);

  React.useEffect(() => {
    if (currentProject >= projectCategories.length * 2) {
      setTimeout(() => {
        if (projectsRef.current) {
          projectsRef.current.style.transition = "none";
          setCurrentProject(projectCategories.length);
          setTimeout(() => {
            if (projectsRef.current) {
              projectsRef.current.style.transition =
                "transform 0.8s ease-in-out";
            }
          }, 50);
        }
      }, 50);
    }
  }, [currentProject]);

  React.useEffect(() => {
    if (currentBrand >= brandPartners.length * 2) {
      setTimeout(() => {
        if (brandsRef.current) {
          brandsRef.current.style.transition = "none";
          setCurrentBrand(brandPartners.length);
          setTimeout(() => {
            if (brandsRef.current) {
              brandsRef.current.style.transition = "transform 0.8s ease-in-out";
            }
          }, 50);
        }
      }, 50);
    }
  }, [currentBrand]);

  // Funciones de navegación manual mejoradas
  const nextCollection = () => {
    setCurrentCollection((prev) => prev + 1);
  };

  const prevCollection = () => {
    setCurrentCollection((prev) => {
      if (prev <= featuredCollections.length) {
        // Saltar al final sin animación
        if (collectionsRef.current) {
          collectionsRef.current.style.transition = "none";
          setTimeout(() => {
            setCurrentCollection(featuredCollections.length * 2 - 1);
            if (collectionsRef.current) {
              collectionsRef.current.style.transition =
                "transform 0.8s ease-in-out";
            }
          }, 50);
        }
        return prev;
      }
      return prev - 1;
    });
  };

  const nextProject = () => {
    setCurrentProject((prev) => prev + 1);
  };

  const prevProject = () => {
    setCurrentProject((prev) => {
      if (prev <= projectCategories.length) {
        if (projectsRef.current) {
          projectsRef.current.style.transition = "none";
          setTimeout(() => {
            setCurrentProject(projectCategories.length * 2 - 1);
            if (projectsRef.current) {
              projectsRef.current.style.transition =
                "transform 0.8s ease-in-out";
            }
          }, 50);
        }
        return prev;
      }
      return prev - 1;
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === customerTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? customerTestimonials.length - 1 : prev - 1
    );
  };

  const nextBrand = () => {
    setCurrentBrand((prev) => prev + 1);
  };

  const prevBrand = () => {
    setCurrentBrand((prev) => {
      if (prev <= brandPartners.length) {
        if (brandsRef.current) {
          brandsRef.current.style.transition = "none";
          setTimeout(() => {
            setCurrentBrand(brandPartners.length * 2 - 1);
            if (brandsRef.current) {
              brandsRef.current.style.transition = "transform 0.8s ease-in-out";
            }
          }, 50);
        }
        return prev;
      }
      return prev - 1;
    });
  };

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] xl:h-[85vh] bg-gray-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Quality Blinds Australia - Premium window treatments showcase video"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <Image
              src="/images/hero-bg.webp"
              alt="Modern living room with premium quality blinds showcasing elegant window treatments by Quality Blinds Australia"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </video>
          {/* Subtle overlay for button visibility */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hidden heading for SEO and accessibility */}
        <h1 id="hero-heading" className="sr-only">
          Quality Blinds Australia - Premium Window Treatments and Custom
          Solutions
        </h1>

        {/* Call-to-action button positioned at bottom - Optimizado para móvil */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10 px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center bg-blue-700/90 hover:bg-blue-800 text-white font-semibold px-6 py-3 sm:px-8 sm:py-3 lg:px-10 lg:py-4 rounded-md lg:rounded-lg transition-all backdrop-blur-sm hover:backdrop-blur-md shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg touch-manipulation"
              aria-label="Explore our featured window treatment collections"
            >
              <span>Explore Our Collection</span>
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div className="bg-white w-full">
        {/* Featured Collections - Optimizado para móvil */}
        <motion.section
          id="featured-collections"
          className="py-12 sm:py-16 lg:py-20"
          aria-labelledby="collections-heading"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              id="collections-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 sm:mb-4 text-gray-900 leading-tight"
            >
              Featured Window Treatment Collections
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
            >
              Discover our comprehensive range of premium blinds, curtains,
              shutters, and awnings. Each product is custom-made to fit your
              windows perfectly with professional installation guaranteed.
            </motion.p>

            {/* Collections Slider */}
            <div className="relative">
              {/* Navigation Arrows - Hidden on mobile, show on larger screens */}
              <button
                onClick={prevCollection}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors hidden lg:block"
                aria-label="Colección anterior"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextCollection}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors hidden lg:block"
                aria-label="Siguiente colección"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Mobile/Tablet: Grid optimizado */}
              <div className="lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {featuredCollections.slice(0, 6).map((collection, index) => (
                    <motion.article
                      key={`mobile-${collection.name}-${index}`}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                        <Link
                          href={collection.link}
                          aria-label={`Learn more about ${collection.name}`}
                          className="block"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={collection.image}
                              alt={`Premium ${collection.name}`}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
                                {collection.name}
                              </h3>
                              <p className="text-sm sm:text-base text-white/90 line-clamp-3 leading-relaxed">
                                {collection.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Desktop Slider - Solo visible en lg+ */}
              <div className="hidden lg:block overflow-hidden px-12 xl:px-16">
                <motion.div
                  ref={collectionsRef}
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentCollection * 100) / 3}%)`,
                  }}
                >
                  {infiniteCollections.map((collection, index) => (
                    <motion.article
                      key={`${collection.name}-${index}`}
                      className="w-1/3 flex-shrink-0 px-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1 }}
                    >
                      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link
                          href={collection.link}
                          aria-label={`Learn more about ${collection.name} - ${collection.description}`}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={collection.image}
                              alt={`Premium ${collection.name} by Quality Blinds Australia - ${collection.description}`}
                              fill
                              sizes="33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h3 className="text-lg font-bold mb-2">
                                {collection.name}
                              </h3>
                              <p className="text-sm opacity-90 line-clamp-2">
                                {collection.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Projects Section - Optimizado para móvil */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 lg:py-20 bg-gray-50"
          aria-labelledby="projects-heading"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              id="projects-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 sm:mb-4 text-gray-900 leading-tight"
            >
              OUR PROJECTS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
            >
              We proudly serve diverse sectors with tailored window treatment
              solutions, from residential builders to major institutions across
              Australia.
            </motion.p>

            {/* Projects Slider */}
            <div className="relative">
              {/* Navigation Arrows - Hidden on mobile */}
              <button
                onClick={prevProject}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors hidden lg:block"
                aria-label="Proyecto anterior"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextProject}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 transition-colors hidden lg:block"
                aria-label="Siguiente proyecto"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Mobile/Tablet: Grid optimizado */}
              <div className="lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {projectCategories.slice(0, 6).map((project, index) => (
                    <motion.div
                      key={`mobile-${project.name}-${index}`}
                      className="group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                          <Image
                            src={project.image}
                            alt={`${project.name} - ${project.description}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white z-20">
                            <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
                              {project.name}
                            </h3>
                            <p className="text-sm sm:text-base opacity-90 line-clamp-3 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Desktop Slider */}
              <div className="hidden lg:block overflow-hidden px-12 xl:px-16">
                <motion.div
                  ref={projectsRef}
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentProject * 100) / 3}%)`,
                  }}
                >
                  {infiniteProjects.map((project, index) => (
                    <motion.div
                      key={`${project.name}-${index}`}
                      className="w-1/3 flex-shrink-0 px-3"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1 }}
                    >
                      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                          <Image
                            src={project.image}
                            alt={`${project.name} - ${project.description}`}
                            fill
                            sizes="33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                            <h3 className="text-lg font-bold mb-2">
                              {project.name}
                            </h3>
                            <p className="text-sm opacity-90 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Quality Blinds */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16"
          aria-labelledby="benefits-heading"
        >
          <div className="w-[80%] mx-auto px-4">
            <h2
              id="benefits-heading"
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              Why Choose Quality Blinds Australia?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              With over 30 years of experience serving Australian homes and
              businesses, we&apos;re committed to delivering exceptional quality
              and service that exceeds expectations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 12l6 6L20 6"
                    />
                  ),
                  title: "Custom Fit Guarantee",
                  description:
                    "Precision measurements and custom manufacturing ensure a perfect fit for every window. No standard sizes - everything made to your exact specifications.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 20v-2m0-8v2m0 4v2"
                    />
                  ),
                  title: "Superior Quality Materials",
                  description:
                    "We use only premium Australian and international materials with rigorous quality testing to ensure longevity, elegance, and optimal performance.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h4l3-3 4 4 3-3 4 4m0 6h-4l-3 3-4-4-3 3H3"
                    />
                  ),
                  title: "Expert Professional Installation",
                  description:
                    "Our certified installers with 25+ years experience guarantee flawless setup. Full warranty coverage and ongoing support included with every installation.",
                },
              ].map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Customer Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-50"
          aria-labelledby="testimonials-heading"
        >
          <div className="w-[80%] mx-auto px-4">
            <motion.h2
              id="testimonials-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              What Our Customers Are Saying
            </motion.h2>

            {/* Google Rating Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">4.4 de 5</span>
              </div>
              <p className="text-gray-600">
                Based on {customerTestimonials.length} reviews from Google
              </p>
            </motion.div>

            {/* Testimonials Slider */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                aria-label="Reseña anterior"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                aria-label="Siguiente reseña"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="overflow-hidden px-12">
                <motion.div
                  className="flex"
                  animate={{ x: `${-currentTestimonial * 100}%` }}
                  transition={{
                    type: "tween",
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {customerTestimonials.map((testimonial, index) => (
                    <div
                      key={`${testimonial.name}-${index}`}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <motion.div
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow max-w-3xl mx-auto"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Google Logo and Stars */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <div className="flex items-center gap-2">
                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            <span className="text-base font-medium text-gray-600">
                              Google
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center italic">
                          &ldquo;{testimonial.review}&rdquo;
                        </p>

                        {/* Customer Info */}
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.date}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Brands Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16"
          aria-labelledby="brands-heading"
        >
          <div className="w-[80%] mx-auto px-4">
            <motion.h2
              id="brands-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
            >
              Brands
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto"
            >
              We offer finest brands in our store
            </motion.p>

            {/* Brands Slider */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevBrand}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                aria-label="Marca anterior"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextBrand}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                aria-label="Siguiente marca"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="overflow-hidden px-12">
                <motion.div
                  ref={brandsRef}
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentBrand * 100) / 3}%)`,
                  }}
                >
                  {infiniteBrands.map((brand, index) => (
                    <motion.article
                      key={`${brand.name}-${index}`}
                      className="w-1/3 flex-shrink-0 px-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1 }}
                    >
                      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link
                          href={brand.link}
                          aria-label={`Learn more about ${brand.name}`}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={brand.logo}
                              alt={`${brand.name} - ${brand.description}`}
                              fill
                              sizes="33vw"
                              className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                              <h3 className="text-lg font-bold mb-1 text-gray-800">
                                {brand.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {brand.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                {/* Mobile optimized brand grid */}
                <div className="sm:hidden">
                  <div className="grid grid-cols-2 gap-4 px-4 mt-8">
                    {brandPartners.map((brand, index) => (
                      <motion.article
                        key={`mobile-brand-${brand.name}-${index}`}
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                          <Link
                            href={brand.link}
                            aria-label={`Learn more about ${brand.name}`}
                          >
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Image
                                src={brand.logo}
                                alt={`${brand.name} - ${brand.description}`}
                                fill
                                sizes="(max-width: 640px) 50vw, 33vw"
                                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-2 text-center bg-gradient-to-t from-white/90 to-transparent">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  {brand.name}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Home;
