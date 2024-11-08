'use client';

import { useState } from 'react';

import './styles.css';

import { Section, Cell, Image, List, Button } from '@telegram-apps/telegram-ui';
import { invoice, MiniAppHeaderColor, miniAppHeaderColorRGB } from '@telegram-apps/sdk-react';

import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page';

import tonSvg from './_assets/ton.svg';
import starSvg from './_assets/star.svg';

export default function Home() {
  miniAppHeaderColorRGB.call('007AFF');

  const t = useTranslations('i18n');

  const buy = async () => {
    const pack = packs.find(pack => selectedPack === pack.name);

    const response = await fetch(`/api/buy?price=${pack?.price}`);
    const data = await response.json();
    const result = await invoice.open(data.link, 'url');
  }

  const [selectedPack, setPack] = useState('');

  const packs: Pack[] = [
    {
      name: 'Small chad pack',
      price: 150,
      content: [
        'Thank you ! ♥',
        'Virtual "kick"',
        'In-game currency'
      ]
    },
    {
      name: 'Normal chad pack',
      price: 350,
      content: [
        'Thank you ! ♥',
        'Founder shoulder badge',
      ]
    },
    {
      name: 'Super chad pack',
      price: 750,
      content: [
        'Thank you ! ♥',
        'Founder shoulder badge',
        'Exclusive gun skin',
        'More in-game currency'
      ]
    },
    {
      name: 'Giga chad pack',
      price: 1000,
      content: [
        'Thank you ! ♥',
        'Founder shoulder badge',
        'Exclusive gun skin',
        'Exclusive character skin',
        'More in-game currency'
      ]
    },
    {
      name: 'Super giga chad pack',
      price: 1500,
      content: [
        'Thank you ! ♥',
        'Founder shoulder badge',
        'Exclusive gun skin',
        'Exclusive character skin',
        'Exclusive parachute skin',
        'More in-game currency'
      ]
    },
    {
      name: 'Super duper ultra mega giga chad ultra deluxe goty edition pack',
      price: 2500,
      content: [
        'Thank you ! ♥',
        'Founder shoulder badge',
        'Exclusive gun skin',
        'Exclusive character skin',
        'Exclusive parachute skin',
        'Exclusive pet companion',
        'More in-game currency'
      ]
    },
  ]

  const handleSelectPack = (pack: Pack) => {
    setPack(pack.name);
  };

  return (
    <Page back={false}>
      <List>
        <Section header="TON Battleground Shop">
          <Link href="/ton-connect">
            <Cell
              before={<Image src={tonSvg.src} style={{ backgroundColor: '#007AFF' }} />}
              subtitle="Connect your TON wallet"
            >TON Connect</Cell>
          </Link>
        </Section>
        <Section header="Thunder packs">
          <div className='p-8'>
            {packs.map((pack, index) => (
              <label
                key={pack.name}
                className={`p-2 pack-option ${selectedPack === pack.name ? 'selected' : ''}`}
                onClick={() => handleSelectPack(pack)}
              >
                <div className='flex-1'>{pack.name}</div>
                <div className='flex-1'>
                  {pack.content.map((item, index) => (
                    <li key={item}>{item}</li>
                  ))}
                </div>
                <div className='flex-1 inline-flex space-x-2'><div>{pack.price}</div><img src={starSvg.src} /></div>
                <input
                  type="radio"
                  name="pack"
                  value={pack.name}
                  checked={selectedPack === pack.name}
                  onChange={() => handleSelectPack(pack)}
                  className="hidden-radio"
                />
              </label>
            ))}
            <Button className='w-full' onClick={buy}>Buy selected pack</Button>
          </div>
        </Section>
      </List>
    </Page>
  );
}

interface Pack {
  name: string;
  price: number; // in stars
  content: string[]
}
