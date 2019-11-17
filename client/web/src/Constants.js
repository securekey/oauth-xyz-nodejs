/*
Copyright SecureKey Technologies Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
export const txObjectRedirect = {
  display: {
    name: 'My Client Display Name',
    uri: 'https://example.net/client'
  },
  interact: {
    redirect: true,
    callback: {
      uri: 'http://localhost:3001/callback/ADD_SOMETHING_HERE',
      nonce: 'MAYBE_CHANGE_ME_TOO'
    }
  },
  user: {
    assertion:
      'eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ',
    type: 'oidc_id_token'
  },
  resources: [
    {
      actions: ['read', 'write', 'dolphin'],
      locations: [
        'https://server.example.net/',
        'https://resource.local/other'
      ],
      datatypes: ['metadata']
    }
  ],
  keys: {
    proof: 'jwsd',
    jwks: {
      keys: [
        {
              "kty": "RSA",
              "q": "1-mbbtjMbN2S2EamY44Ten3LIjNvfzVx3wOP9rhsTQFRpwrKmOkUfX8vgz6xqgg7tTy4S55FQVlwzNcQlpzNnUwgIS_4OItjDxYc_P9juSPFWWoQqbWbuEfgvE-XjSvkgMHYLNTJwI9fhW2rM4jin_W6sUVaVBWJ8NaLowSerHk",
              "e": "AQAB",
              "kid": "xyz-1",
              "alg": "RS256",
              "n": "ucstjxSr32Bh-s8qcrl9eYmQYH2uCNdrdLEQxlSgW7RcWAex9UoJA1fpyc4QODxoI6IUyuP6to2t9KXFqi_RePgiDxrWWjQtEuEE7UT1ziYMuKPqvh_YZgbuc4pWEWDqY72yOQgQ8utQRs-VkYg3UOVT9H0aYQ67Z0viu3prUDgct0zD9l7LilQOjJ60VPqLko5IU-rNyRBWf75wY5sZktIqemNsHLzknvWRukukaKl-fjGQSywKOmQiBwHn3V97xL8UhGLAzX_Zyy5dcPUR8ojm11W4hHB8fOi_iq0YkzzVviII0lxQ-RbiHpO1Jv7iv-0mKxfAtXk5lyxBOWFAXQ"
        }
      ]
    }
  }
};

export const txObjectDevice = {
  display: {
    name: 'My Client Display Name',
    uri: 'https://example.net/client'
  },
  interact: {
    user_code: true
  },
  user: {
    assertion:
      'eyJraWQiOiIxZTlnZGs3IiwiYWxnIjoiUlMyNTYifQ.ewogImlzcyI6ICJodHRwOi8vc2VydmVyLmV4YW1wbGUuY29tIiwKICJzdWIiOiAiMjQ4Mjg5NzYxMDAxIiwKICJhdWQiOiAiczZCaGRSa3F0MyIsCiAibm9uY2UiOiAibi0wUzZfV3pBMk1qIiwKICJleHAiOiAxMzExMjgxOTcwLAogImlhdCI6IDEzMTEyODA5NzAsCiAibmFtZSI6ICJKYW5lIERvZSIsCiAiZ2l2ZW5fbmFtZSI6ICJKYW5lIiwKICJmYW1pbHlfbmFtZSI6ICJEb2UiLAogImdlbmRlciI6ICJmZW1hbGUiLAogImJpcnRoZGF0ZSI6ICIwMDAwLTEwLTMxIiwKICJlbWFpbCI6ICJqYW5lZG9lQGV4YW1wbGUuY29tIiwKICJwaWN0dXJlIjogImh0dHA6Ly9leGFtcGxlLmNvbS9qYW5lZG9lL21lLmpwZyIKfQ.rHQjEmBqn9Jre0OLykYNnspA10Qql2rvx4FsD00jwlB0Sym4NzpgvPKsDjn_wMkHxcp6CilPcoKrWHcipR2iAjzLvDNAReF97zoJqq880ZD1bwY82JDauCXELVR9O6_B0w3K-E7yM2macAAgNCUwtik6SjoSUZRcf-O5lygIyLENx882p6MtmwaL1hd6qn5RZOQ0TLrOYu0532g9Exxcm-ChymrB4xLykpDj3lUivJt63eEGGN6DH5K6o33TcxkIjNrCD4XB1CKKumZvCedgHHF3IAK4dVEDSUoGlH9z4pP_eWYNXvqQOjGs-rDaQzUHl6cQQWNiDpWOl_lxXjQEvQ',
    type: 'oidc_id_token'
  },
  resources: [
    {
      actions: ['read', 'write', 'dolphin'],
      locations: [
        'https://server.example.net/',
        'https://resource.local/other'
      ],
      datatypes: ['metadata']
    }
  ],
  keys: {
    proof: 'jwsd',
    jwks: {
      keys: [
        {
              "kty": "RSA",
              "q": "1-mbbtjMbN2S2EamY44Ten3LIjNvfzVx3wOP9rhsTQFRpwrKmOkUfX8vgz6xqgg7tTy4S55FQVlwzNcQlpzNnUwgIS_4OItjDxYc_P9juSPFWWoQqbWbuEfgvE-XjSvkgMHYLNTJwI9fhW2rM4jin_W6sUVaVBWJ8NaLowSerHk",
              "e": "AQAB",
              "kid": "xyz-1",
              "alg": "RS256",
              "n": "ucstjxSr32Bh-s8qcrl9eYmQYH2uCNdrdLEQxlSgW7RcWAex9UoJA1fpyc4QODxoI6IUyuP6to2t9KXFqi_RePgiDxrWWjQtEuEE7UT1ziYMuKPqvh_YZgbuc4pWEWDqY72yOQgQ8utQRs-VkYg3UOVT9H0aYQ67Z0viu3prUDgct0zD9l7LilQOjJ60VPqLko5IU-rNyRBWf75wY5sZktIqemNsHLzknvWRukukaKl-fjGQSywKOmQiBwHn3V97xL8UhGLAzX_Zyy5dcPUR8ojm11W4hHB8fOi_iq0YkzzVviII0lxQ-RbiHpO1Jv7iv-0mKxfAtXk5lyxBOWFAXQ"
        }
      ]
    }
  }
};

export const clientJwk = {
      "p": "3EoC6afBBq3VzPmZgfpjr9ghDucSA66yUH2_K-ZFX-4cehIgUzgqti-60ZbKLlaiD04XQI9V1YRHLQpMIka96mzvVG9HOoAgs9QV6rIF3Mph7gJJ3DO0qVrC-HNA6j-jJGFoILq4mqdu_j2EO-FcXa8XUsR5bx2C8DDorfLKcgU",
      "kty": "RSA",
      "q": "1-mbbtjMbN2S2EamY44Ten3LIjNvfzVx3wOP9rhsTQFRpwrKmOkUfX8vgz6xqgg7tTy4S55FQVlwzNcQlpzNnUwgIS_4OItjDxYc_P9juSPFWWoQqbWbuEfgvE-XjSvkgMHYLNTJwI9fhW2rM4jin_W6sUVaVBWJ8NaLowSerHk",
      "d": "dXABFyy4yxQwOonSSfwHXNhgQy2N4RbRXExDzylUx0KFEDuk9-fZNJzQMPgodnNwW_2qaOib4-JAL6DNBZr-LBmj5apQDWpnh0RmideKC8kvR1KNIaodbbg55xxs9MUuwub4DWaU2Ad3kZrK7teMJ30diS--idT3Df8AjQJ_bI9HltycHje6CG8i-tv-mXT99IZ8aZSte2_t4evW2320Zr7n0IZHV18GhWSFFBho31Q_8KBm-41Q1qYXJlx4CgA4hV538FxVXSWMDJ_FuNJhDJ_sVYH8ZeNwNcFoZBF54BB-bZf7dvEwj6KQ2R1rmzgsh-qpsx830cXMYOOiYQCH4Q",
      "e": "AQAB",
      "kid": "xyz-1",
      "alg": "RS256",
      "qi": "UyJ2bNauZS4NPtoFXgCLZNJJ_IhqtSkmiLiZ_t21gTcpLdDRzobv0HxMZL5m63dZkkcAWltNNNiHrxv_35Lj4kKz-pith_y4G3q8ghLUQ3yfHMEPQfNde20FarEaYv7GBf_ZISg4RSJJXz8do7yAF64aEXgOE6VS-Smo7bW9wtk",
      "dp": "Ib54mcAnslU4lfB6Ek3_rTUHQ1gkC0pcaDYK7beVUu-PjydtqjHFYSkIjghyKgz9QCjvKOWL-WwM1xpntSxu9RUAyEdPeuebmtBXFx90BHE_9QyGseN9vh94FETbYcajv_Pn1nOjyZTyTKGxutZ3pqYmhXgxPdMgdpiXW-YAGt0",
      "dq": "cS4Bzl9S-ZZEjZ6rRfCKAWHDg9AWmEY5xL-nTZtrGgqg9MFRZkp39TkgfNn2Y70hH2YO7YSvpQvvd1EdXvYfSl9HUF5G7c0TRis_UtfFPJ2lq7NPvMZ4NGdpRQ0r0lK520zBtu5sO8ZsOhM89SzCLzuue5JxQTZxMpAkbnXTf3E",
      "n": "ucstjxSr32Bh-s8qcrl9eYmQYH2uCNdrdLEQxlSgW7RcWAex9UoJA1fpyc4QODxoI6IUyuP6to2t9KXFqi_RePgiDxrWWjQtEuEE7UT1ziYMuKPqvh_YZgbuc4pWEWDqY72yOQgQ8utQRs-VkYg3UOVT9H0aYQ67Z0viu3prUDgct0zD9l7LilQOjJ60VPqLko5IU-rNyRBWf75wY5sZktIqemNsHLzknvWRukukaKl-fjGQSywKOmQiBwHn3V97xL8UhGLAzX_Zyy5dcPUR8ojm11W4hHB8fOi_iq0YkzzVviII0lxQ-RbiHpO1Jv7iv-0mKxfAtXk5lyxBOWFAXQ"
};

export const newTransaction = true;
export default window.Test;
