"use client"

import { XMLParser } from "fast-xml-parser"
import * as XLSX from "xlsx"
import type { NFeProc, Det } from "./types"

export interface ProdutoFormatado {
  codProduto: string
  descricao: string
  ncm: string
  csosn: string
  cst: string
  cfop: string
  unidade: string
  quantidade: string
  valorUnitario: string
  valorTotal: string
  valorDesconto: string
}

export function processarXML(xmlData: string): ProdutoFormatado[] {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    })

    const jsonObj: NFeProc = parser.parse(xmlData)
    const nfeParsed = jsonObj.nfeProc.NFe.infNFe
    const produtos = nfeParsed.det

    const produtosFormatted = produtos.map((produto: Det) => {
      let csosnValue = ""
      let cstValue = ""

      if (produto.imposto?.ICMS) {
        const icmsKey = Object.keys(produto.imposto.ICMS)[0]
        const icmsObj = produto.imposto.ICMS[icmsKey]
        if (icmsObj) {
          const orig = icmsObj.orig || "0"
          const csosn = icmsObj.CSOSN || "000"
          csosnValue = `${orig}${csosn}`
        }
      }

      if (produto.imposto?.ICMS) {
        const icmsKey = Object.keys(produto.imposto.ICMS)[0]
        const icmsObj = produto.imposto.ICMS[icmsKey]
        if (icmsObj) {
          const orig = icmsObj.orig || "0"
          const cst = icmsObj.CST || "00"
          cstValue = `${orig}${cst}`
        }
      }

      return {
        codProduto: produto.prod.cProd,
        descricao: produto.prod.xProd,
        ncm: produto.prod.NCM || "",
        csosn: csosnValue,
        cst: cstValue,
        cfop: produto.prod.CFOP || "",
        unidade: produto.prod.uCom || "",
        quantidade: produto.prod.qCom || "",
        valorUnitario: produto.prod.vUnCom || "",
        valorTotal: produto.prod.vProd || "",
        valorDesconto: produto.prod.vDesc || "",
      }
    })

    return produtosFormatted
  } catch (error) {
    console.error("Erro ao processar XML:", error)
    throw new Error("Erro ao processar XML. Verifique se o arquivo é uma Nota Fiscal válida.")
  }
}

export function gerarExcel(produtosFormatted: ProdutoFormatado[], nomeArquivo = "produtos.xlsx"): void {
  try {
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(produtosFormatted)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos")

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" }) as ArrayBuffer

    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = nomeArquivo
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Erro ao gerar Excel:", error)
    throw new Error("Erro ao gerar arquivo Excel.")
  }
}
