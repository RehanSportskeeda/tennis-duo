import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
}

export function SEOHead({
  title = 'NHL Duo - Daily Hockey Grid Game',
  description = "NHL Duo is a fun, brain-teasing puzzle where you fill the grid by following logical rules. It's perfect for NHL fans who love a good challenge!",
  image = 'https://www.profootballnetwork.com/games/nhl-duo/nhl-duo-og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://www.profootballnetwork.com/games/nhl-duo/',
  type = 'website',
  siteName = 'Pro Football Network',
  twitterCard = 'summary_large_image',
  twitterSite = '@PFSN365',
  keywords = 'NHL game, NHL daily challenge, hockey puzzle, NHL grid game, daily NHL game',
  author = 'PFSN',
  canonical
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Set lang attribute on HTML element
    document.documentElement.lang = 'en-US';

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-image-preview:large');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '1 day');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url;
    updateMetaTag('og:image', image.startsWith('http') ? image : `https://www.profootballnetwork.com/games/nhl-duo${image}`, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `https://www.profootballnetwork.com/games/nhl-duo${image}`);
    updateMetaTag('twitter:site', twitterSite);
    updateMetaTag('twitter:creator', twitterSite);

    // Canonical URL
    const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : url);
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }

    // Structured data for Google - Multiple schemas
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        // WebApplication/Game schema
        {
          '@type': 'WebApplication',
          '@id': currentUrl + '#game',
          'name': title,
          'url': currentUrl,
          'description': description,
          'applicationCategory': 'Game',
          'genre': 'Sports',
          'browserRequirements': 'Requires JavaScript. Requires HTML5.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'publisher': {
            '@id': 'https://www.profootballnetwork.com/#organization'
          }
        },
        // WebPage schema
        {
          '@type': 'WebPage',
          '@id': currentUrl + '#webpage',
          'url': currentUrl,
          'name': title,
          'description': description,
          'isPartOf': {
            '@id': 'https://www.profootballnetwork.com/#website'
          },
          'about': {
            '@id': currentUrl + '#game'
          },
          'publisher': {
            '@id': 'https://www.profootballnetwork.com/#organization'
          },
          'inLanguage': 'en-US'
        },
        // NewsMediaOrganization schema
        {
          '@type': 'NewsMediaOrganization',
          '@id': 'https://www.profootballnetwork.com/#organization',
          'name': 'Pro Football Network',
          'url': 'https://www.profootballnetwork.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.profootballnetwork.com/logo.png'
          },
          'sameAs': [
            'https://twitter.com/PFSN365',
            'https://www.facebook.com/ProFootballNetwork',
            'https://www.instagram.com/profootballnetwork',
            'https://www.youtube.com/profootballnetwork'
          ]
        },
        // SiteNavigationElement schema
        {
          '@type': 'SiteNavigationElement',
          'name': 'Games',
          'url': 'https://www.profootballnetwork.com/games/',
          'position': 1
        },
        {
          '@type': 'SiteNavigationElement', 
          'name': 'NHL Duo',
          'url': currentUrl,
          'position': 2
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url, type, siteName, twitterCard, twitterSite, keywords, author, canonical]);

  return null;
}

export default SEOHead;