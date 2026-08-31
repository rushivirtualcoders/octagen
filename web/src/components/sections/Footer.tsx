import { motion } from 'framer-motion'
import { ASSETS, BRAND, CLAIM, DISTRIBUTOR, NAV_LINKS } from '../../lib/constants'
import { EASE } from '../../lib/animations'
import Reveal, { RevealItem, RevealStagger } from '../ui/Reveal'

export default function Footer() {
  return (
    <footer id="about" className="border-t border-line bg-surface">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="racing-stripe-h h-1 w-full origin-left"
      />
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          <Reveal variant="blur" className="max-w-sm">
            <motion.img
              src={ASSETS.octagenLogo}
              alt={DISTRIBUTOR}
              className="h-10 w-auto"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
            <img src={ASSETS.liquiMolyLogo} alt={BRAND} className="mt-4 h-7 w-auto opacity-90" />
            <p className="tech-label mt-4 text-lm-red">{CLAIM}</p>
            <p className="mt-5 text-sm leading-relaxed font-light text-muted">
              Premium motor oils, additives and car care — distributed nationally across India by{' '}
              {DISTRIBUTOR}.
            </p>
          </Reveal>

          <Reveal variant="left" delay={0.1}>
            <nav aria-label="Footer">
              <RevealStagger className="grid grid-cols-2 gap-x-16 gap-y-4">
                {NAV_LINKS.map((link) => (
                  <RevealItem key={link.href}>
                    <a
                      href={link.href}
                      className="tech-label text-muted transition-all duration-300 hover:translate-x-1 hover:text-lm-orange"
                    >
                      {link.label}
                    </a>
                  </RevealItem>
                ))}
              </RevealStagger>
            </nav>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.15} className="mt-16 flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs font-light text-muted">
            LIQUI MOLY India is proudly operated and fulfilled by Octagen, the exclusive authorized
            national distributor.
          </p>
          <p className="tech-label text-ink/30">
            © {new Date().getFullYear()} {BRAND} · {DISTRIBUTOR}. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
