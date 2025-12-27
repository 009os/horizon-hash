#!/usr/bin/env node

/**
 * Add Crypto History Articles to Supabase
 * Run with: node scripts/add-crypto-history-articles.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const articles = [
  {
    slug: 'crypto-history-fall-of-mt-gox',
    title: 'The Fall of Mt. Gox: The Hack That Shaped Bitcoin\'s Future',
    date: '2025-10-04T00:00:00Z',
    cover_image: '/assets/blog/preview/cover.jpg',
    excerpt: 'Every major technology has its initial setbacks. The demise of Mt. Gox, the world\'s biggest cryptocurrency exchange, was that catastrophe for Bitcoin.',
    og_image_url: null,
    content: `# Introduction

Every major technology has its initial setbacks. The demise of Mt. Gox, the world's biggest cryptocurrency exchange, was that catastrophe for Bitcoin. Mt. Gox processed more than 70% of all Bitcoin transactions worldwide at its height. For thousands of early adopters, it served as their entry point into cryptocurrency. However, it fell apart in one of the most notorious financial cyberattacks ever in 2014.

There was more to the Mt. Gox event than just thievery. It was an event that made the community reevaluate how trust, security, and custody should be managed and exposed the weakness of early crypto infrastructure.

## The Rise of Mt. Gox

Before switching to Bitcoin, Mt. Gox was first introduced in 2010 as a website for trading "Magic: The Gathering" cards. The exchange swiftly became the market leader and the go-to place to purchase and sell Bitcoin. Early cryptocurrency consumers equated Mt. Gox with Bitcoin.

There was little competition and very few transactions back then. Although Mt. Gox's popularity soared, its management and technology were unable to keep up with the rate of uptake.

## The Hack and Collapse

Withdrawals from Mt. Gox were abruptly stopped in February 2014. The confusion spread quickly. The reality soon surfaced: 850,000 Bitcoins, which at the time were worth about $450 million, had been stolen by hackers. Tens of billions of dollars would be the current value of those stolen coins.

The hack had not occurred suddenly. It was brought on by years of poor management, a lack of internal controls, and security flaws. Consumers lost access to their money, and the entire cryptocurrency market was rocked by fear. Bitcoin's price plummeted as a result of the collapse, which also cast doubt on the sustainability of digital currencies.

## Aftermath and Legal Battles

A protracted and intricate legal process was initiated by Mt. Gox's bankruptcy. As attorneys, trustees, and regulators argued over the distribution of the remaining assets, creditors were left in a state of near-term uncertainty. Some were afraid they would never see their money again, so they sold their claims early for cents on the dollar. Others waited and started getting paid back in 2024.

The repayment was both heartbreaking and historic. In contrast to the phenomenal value that Bitcoin has attained in the years thereafter, many creditors who lost Bitcoin in 2014 would now receive their money back in fiat money or in partial sums of BTC.

## Lessons Learned

The crypto sector had to mature as a result of the Mt. Gox disaster. Exchanges started implementing more stringent security measures, including as cold storage, multi-signature wallets, and proof-of-reserves. Additionally, it expedited the slogan that all cryptocurrency users are now familiar with:

"Neither your coins nor your keys."

The incident demonstrated the enormous hazards involved with putting your trust in centralized exchanges. In the years that followed, self-custody and decentralized systems gained significance.

In the history of cryptocurrency, the Mt. Gox breach marked a watershed. For many investors, it was disastrous, chaotic, and terrible. However, it also set the stage for an environment that is more resilient. It is probable that the decentralized platforms, exchanges, and custodians of today would not be as safe or open without Mt. Gox.

Crypto demonstrated its tenacity by surviving its first major slump. Bitcoin survived the collapse of Mt. Gox. That marked the start of its transition from a precarious experiment to a worldwide financial revolution.`,
    preview: false
  },
  {
    slug: 'crypto-history-rise-and-fall-of-icos',
    title: 'The Rise and Fall of ICOs: How 2017\'s Token Boom Shaped Modern Crypto',
    date: '2025-09-20T00:00:00Z',
    cover_image: '/assets/blog/preview/cover.jpg',
    excerpt: 'One of the most explosive periods in cryptocurrency history began in 2017 with the ICO (Initial Coin Offering) boom.',
    og_image_url: null,
    content: `# The Beginning of ICOs

One of the most explosive periods in cryptocurrency history began in 2017 with the ICO (Initial Coin Offering) boom.

By selling their own blockchain tokens to the general public, an initial coin offering (ICO) enables startups to raise capital. With a few clicks, anyone could invest without going through banks or venture capital.

Projects claimed to be "the next internet," "the next Ethereum," or even "the next decentralized bank." The money poured in in the billions.

## The Hype Cycle

It peaked in the middle of 2017: In a single year, initial coin offerings (ICOs) raised over $6 billion. In a matter of minutes, some projects sold out. Returns for early investors were at least 100 times higher. An initial coin offering (ICO) in 2014 gave rise to Ethereum, which fueled the notion that any token could be the next big thing.

## The Dark Side

However, there were issues behind the hype:

**Scams & Rug Pulls:** A lot of projects were just a fancy whitepaper with no team or product. Millions of dollars were lost by investors. No restrictions — anyone could start an initial coin offering. There was virtually no accountability.

**Speculation Over Utility:** Aside from trading, the majority of tokens had no practical applications. The bubble burst by 2018. The ICO era came to an end when prices plummeted and authorities clamped down.

## The Legacy of ICOs

Despite the fact that many failed, ICOs taught us valuable lessons:

The world was ready to fund ideas with cryptocurrency, as demonstrated by initial coin offerings (ICOs).

**Regulation is important:** new regulations developed by governments around the world have resulted in safer fundraising models.

**Development into new models:** Initial coin offerings (ICOs) spawned token launches through DAOs, IEOs (Initial Exchange Offerings), and IDOs (Decentralized Offerings).

## Closing Thought

A combination of ingenuity, greed, and mayhem characterized the 2017 ICO boom. It demonstrated both the benefits and risks of international fundraising.

Remember that refined DeFi protocols, NFT launches, and token sales on launchpads today are all products of that crazy ICO era.

The ICO frenzy was the gold rush of cryptocurrency. The world learned how powerful and dangerous open finance can be, even though some people made a fortune and the majority were left with dust.`,
    preview: false
  }
];

async function addCryptoHistoryArticles() {
  try {
    console.log('🚀 Adding Crypto History articles to Supabase...\n');

    // First, find or create the author (try common author names)
    const authorNames = ['Omji Shukla', 'Horizon', 'JJ', 'Joe', 'Tim'];
    let author = null;

    for (const authorName of authorNames) {
      const { data: authorData } = await supabase
        .from('authors')
        .select('*')
        .eq('name', authorName)
        .single();

      if (authorData) {
        author = authorData;
        console.log(`✅ Found author: ${authorName}`);
        break;
      }
    }

    if (!author) {
      console.log('⚠️  No author found. Creating "Omji Shukla" author...');
      const { data: newAuthor, error: authorError } = await supabase
        .from('authors')
        .insert({
          name: 'Omji Shukla',
          picture: null
        })
        .select()
        .single();

      if (authorError) {
        throw authorError;
      }

      author = newAuthor;
      console.log('✅ Created author: Omji Shukla');
    }

    // Check existing posts
    const { data: existingPosts } = await supabase
      .from('posts')
      .select('slug')
      .in('slug', articles.map(a => a.slug));

    const existingSlugs = new Set(existingPosts?.map(p => p.slug) || []);

    // Add articles
    let addedCount = 0;
    let skippedCount = 0;

    for (const article of articles) {
      if (existingSlugs.has(article.slug)) {
        console.log(`⏭️  Skipping ${article.slug} (already exists)`);
        skippedCount++;
        continue;
      }

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert({
          ...article,
          author_id: author.id
        })
        .select()
        .single();

      if (postError) {
        console.error(`❌ Error adding ${article.slug}:`, postError.message);
      } else {
        console.log(`✅ Added: ${article.title}`);
        addedCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Added: ${addedCount} articles`);
    console.log(`   ⏭️  Skipped: ${skippedCount} articles (already exist)`);
    console.log(`\n🎉 Done! Visit /crypto-history to see your articles.`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addCryptoHistoryArticles();

