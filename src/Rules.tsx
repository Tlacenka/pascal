import React from 'react';

export const Rules: React.FC = () => {
  return (
    <div>
      <h2>Pravidla</h2>
      <p>Pro vyhodnocení síly hesla jsou použita následující kritéria.</p>
      <table>
        <thead>
          <tr>
            <th>Síla</th>
            <th>Délka</th>
            <th>Velká písmena</th>
            <th>Malá písmena</th>
            <th>Čísla</th>
            <th>Speciální znaky</th>
            <th>Další pravidla</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>slabé</td>
            <td>6-8</td>
            <td>1+</td>
            <td>1+</td>
            <td>1+</td>
            <td>-</td>
            <td>-</td>
          </tr>
                    <tr>
            <td>průměrné</td>
            <td>9-10</td>
            <td>1+</td>
            <td>1+</td>
            <td>1+</td>
            <td>-</td>
            <td>Alespoň jedno velké písmeno se musí vyskytovat mezi malými (např. for3<b>V</b>3r).</td>
          </tr>
          <tr>
            <td>silné</td>
            <td>11+</td>
            <td>1+</td>
            <td>1+</td>
            <td>1+</td>
            <td>1+</td>
            <td>Stejná jako pro střední. Navíc nesmí obsahovat sekvenci symbolů stejného typu o větší délce než 5 (např. ne C<s>zechit</s>As4ever!).</td>
          </tr>
        </tbody>
      </table>

    <h3>Typy symbolů  </h3>
    Heslo může obsahovat pouze následující symboly:
      <ul>
        <li>velká písmena bez diakritiky (A, B, C, ...)</li>
        <li>malá písmena bez diakritiky (a, b, c, ...)</li>
        <li>čísla (0, 1, 2, ...)</li>
        <li>spciální znaky (povoleny pouze - _ + * ? !)</li>
      </ul>

    </div>
    
  )
}
