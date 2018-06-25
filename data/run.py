#!/usr/bin/env python
# -*- coding: utf-8 -*-
import psycopg2
import json
import codecs
import csv

conn = psycopg2.connect(
    "dbname=madera user=maderuser password=123456 host=localhost")
cur = conn.cursor()

ranking = {}
empresas = {}

paises = ['Perú', 'Bolivia', 'Colombia', 'Ecuador']
anios = ['2010', '2011', '2012', '2013',
         '2014', '2015', '2016', '2017', 'todos']
for pais in paises:
    ranking[pais] = {}
    for anio in anios:
        if anio == 'todos':
            cur.execute("""
                select empresa, sum(fob) as total from madera
                where origen=%s and destino!='No Hay Información' and empresa!='No Hay Información'
                group by empresa
                order by total desc
                limit 10;
                """, (pais,))
        else:
            cur.execute("""
                select empresa, sum(fob) as total from madera
                where anio=%s and origen=%s and destino!='No Hay Información' and empresa!='No Hay Información'
                group by anio, empresa
                order by total desc
                limit 10;
                """, (anio, pais))

        # print ""
        # print "----------- " + pais + " - " + anio + " -----------"
        # print ""

        for record in cur:
            # print record[0], record[1]
            if not anio in ranking[pais]:
                ranking[pais][anio] = []

            empresa = record[0]  # .encode('utf-8')

            ranking[pais][anio].append({
                'empresa': empresa,
                'fob': record[1],
            })

            empresas[empresa] = {
                'pais': pais,
            }

cnt = 0

for empresa in empresas:
    cur.execute("""
        select anio, sum(fob) as total from madera
        where empresa=%s
        group by anio order by anio limit 10;
        """, (empresa,))

    empresas[empresa]['historico'] = []

    cnt += 1

    for record in cur:
        empresas[empresa]['historico'].append({
            'anio': record[0],
            'fob': record[1],
        })

print "Empresas: " + str(cnt)

data = {
    'ranking': ranking,
    'empresas': empresas,
}


def ascii_encode_dict(data):
    ascii_encode = lambda x: x.encode('ascii')
    return dict(map(ascii_encode, pair) for pair in data.items())

# print json.dumps(empresas, sort_keys=True, indent=4)

with codecs.open('top10.json', 'w') as outfile:
    json.dump(data, outfile, sort_keys=True, indent=4, ensure_ascii=False)
    # json.dump(data, outfile)

with codecs.open('empresas.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='"', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(
        ['empresa', 'pais', 'Logo', 'Antecedentes', 'Tipos de especies'])
    for empresa in empresas:
        spamwriter.writerow([empresa, empresas[empresa]['pais'], '', '', ''])
