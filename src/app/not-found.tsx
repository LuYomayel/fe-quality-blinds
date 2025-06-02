"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            <Image
              src="/images/logo-no-bg.webp"
              alt="404 Not Found"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl font-bold text-gray-900 mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-semibold text-gray-700 mb-6"
          >
            Página no encontrada
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida. Por favor, verifica la URL o regresa a la página principal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-x-4"
          >
            <Link
              href="/"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Volver al inicio
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Contactar soporte
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Productos Populares
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blinds/roller/blockout-roller-blinds"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Blockout Roller Blinds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/curtains/blockout-curtains"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Blockout Curtains
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shutters/abs-shutters"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ABS Shutters
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Categorías
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blinds"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Persianas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/curtains"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Cortinas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/awnings"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Toldos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Información
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
