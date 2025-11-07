export interface NFeProc {
  nfeProc: {
    _attributes?: { versao?: string }
    versao?: string
    NFe: NFe
  }
}

export interface NFe {
  _attributes?: { xmlns?: string }
  infNFe: InfNFe
}

export interface InfNFe {
  _attributes?: { versao?: string; Id?: string }
  versao?: string
  Id?: string
  ide: Ide
  emit: Emitente
  dest?: Destinatario
  det: Det[]
  total?: Total
  transp?: any
  cobr?: any
  pag?: any
  infAdic?: any
}

export interface Ide {
  cUF: string
  cNF: string
  natOp: string
  mod: string
  serie: string
  nNF: string
  dhEmi: string
  tpNF: string
  idDest?: string
  cMunFG?: string
  tpImp?: string
  tpEmis?: string
  cDV?: string
  tpAmb?: string
  finNFe?: string
  indFinal?: string
  indPres?: string
  procEmi?: string
  verProc?: string
  NFref?: NFref[]
}

export interface NFref {
  refNFe?: string
}

export interface Emitente {
  CNPJ?: string
  CPF?: string
  xNome: string
  xFant?: string
  enderEmit: Endereco
  IE?: string
  IEST?: string
  IM?: string
  CNAE?: string
  CRT?: string
}

export interface Destinatario {
  dest: {
    CNPJ?: string
    CPF?: string
    idEstrangeiro?: string
    xNome: string
    enderDest?: Endereco
    indIEDest?: string
    IE?: string
    ISUF?: string
    IM?: string
    email?: string
  }
}

export interface Endereco {
  xLgr?: string
  nro?: string
  xCpl?: string
  xBairro?: string
  cMun?: string
  xMun?: string
  UF?: string
  CEP?: string
  cPais?: string
  xPais?: string
  fone?: string
}

export interface Det {
  _attributes?: { nItem?: string }
  nItem?: string
  prod: Prod
  imposto?: Imposto
  infAdProd?: string
}

export interface Prod {
  cProd: string
  cEAN?: string
  xProd: string
  NCM?: string
  CEST?: string
  CFOP?: string
  uCom: string
  qCom: string
  vUnCom: string
  vProd: string
  cEANTrib?: string
  uTrib?: string
  qTrib?: string
  vUnTrib?: string
  vDesc?: string
  indTot?: string
}

export interface Imposto {
  ICMS?: ICMS
  IPI?: IPI
  PIS?: PIS
  COFINS?: COFINS
}

export interface ICMS {
  [key: string]: ICMSType | undefined
}

export interface ICMSType {
  orig: string
  CSOSN?: string
  CST?: string
  vBCSTRet?: string
  pST?: string
  vICMSSubstituto?: string
  vICMSSTRet?: string
}

export interface IPI {
  cEnq?: string
  IPITrib?: IPITrib
}

export interface IPITrib {
  CST: string
  vBC?: string
  pIPI?: string
  vIPI?: string
}

export interface PIS {
  PISOutr?: PISOutr
}

export interface PISOutr {
  CST: string
  vBC?: string
  pPIS?: string
  vPIS?: string
}

export interface COFINS {
  COFINSOutr?: COFINSOutr
}

export interface COFINSOutr {
  CST: string
  vBC?: string
  pCOFINS?: string
  vCOFINS?: string
}

export interface Total {
  ICMSTot?: ICMSTot
}

export interface ICMSTot {
  vBC?: string
  vICMS?: string
  vICMSDeson?: string
  vFCP?: string
  vBCST?: string
  vST?: string
  vFCPST?: string
  vFCPSTRet?: string
  vProd?: string
  vFrete?: string
  vSeg?: string
  vDesc?: string
  vII?: string
  vIPI?: string
  vIPIDevol?: string
  vPIS?: string
  vCOFINS?: string
  vOutro?: string
  vNF?: string
  vTotTrib?: string
}
