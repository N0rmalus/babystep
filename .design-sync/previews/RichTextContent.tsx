import { RichTextContent } from 'babysteps-store';

const description = `
<p>Lengvas muslino miegmaišis padeda kūdikiui išlaikyti pastovią temperatūrą visą naktį, todėl jis rečiau prabunda.</p>
<h2>Kodėl tėvai jį renkasi</h2>
<ul>
  <li><strong>Kvėpuojantis audinys</strong>: 100 % medvilnės muslinas, du sluoksniai.</li>
  <li>Užtrauktukas apačioje, kad naktį būtų lengva pakeisti sauskelnes.</li>
  <li>Tinka nuo gimimo iki 6 mėnesių.</li>
</ul>
<h3>Priežiūra</h3>
<p>Skalbk 30 °C temperatūroje, <em>nedžiovink</em> džiovyklėje.</p>
<blockquote>Mūsų dukra pagaliau miega ilgiau nei tris valandas iš eilės. Ačiū!</blockquote>
`;

export const ProductDescription = () => (
  <div className="max-w-xl">
    <RichTextContent content={description} />
  </div>
);

export const OrderedSteps = () => (
  <div className="max-w-xl">
    <RichTextContent
      content={`<h2>Kaip grąžinti prekę</h2><ol><li>Parašyk mums el. paštu per 14 dienų nuo gavimo.</li><li>Supakuok prekę originalioje pakuotėje.</li><li>Pinigus grąžinsime per 5 darbo dienas.</li></ol><p>Klausimų? Mielai padėsime.</p>`}
    />
  </div>
);
