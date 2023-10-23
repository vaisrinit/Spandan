import { fnDbQuery } from '../config/psqlAPM';

export class PoliticsDbQry {
    constructor() { }
    async insertStates(param: any) {
        let result: any;
        param.map((e:any) => {
            const qryText = "insert into politics.states_json(stateId,countryCd,stateType,stateName,stateNameHindi,effectiveFrom,effectiveTo,isActive,createdDttm,modifiedBy,modifiedDttm,statecode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
            const qryParam = [e.stateId, e.countryCd, e.stateType, e.stateName, e.stateNameHindi, e.effectiveFrom, e.effectiveTo, e.isActive, e.createdDttm, e.modifiedBy, e.modifiedDttm,e.stateCd];
            result = fnDbQuery("insertStates", qryText, qryParam);
        })
        return result;
    }
    async insertDistricts(param: any) {
        let result: any;
        param.map((e:any) => {
            const qryText = "insert into politics.eci_districts(state,districtNo,districtValue,districtValueHindi,effectiveFrom,effectiveTo,isActive,createdBy,createdDttm,modifiedBy,modifiedDttm,districtCd) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
            const qryParam = [e.state, e.districtNo, e.districtValue, e.districtValueHindi, e.effectiveFrom, e.effectiveTo, e.isActive, e.createdBy, e.createdDttm, e.modifiedBy, e.modifiedDttm,e.districtCd];
            result = fnDbQuery("insertDistricts", qryText, qryParam);
        })
        return result;
    }
    async insertAssemblies(param: any) {
        let result: any;
        param.map((e:any) => {
            const qryText = "insert into politics.eci_assemblies(asmblyNo,stateCd,districtCd,asmblyName,category,asmblyNameL1,asmblyNameL2,categoryL1,categoryl2,effectiveFrom,effectiveTo,isActive,createdBy,createdDttm,modifiedBy,modifiedDttm,languagePneumonicL1,languagePneumonicL2,pcNo,prlmntNameL1,prlmntNameL2,prlmntCategoryL1,prlmntCategoryL2,acId) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)";
            const qryParam = [e.asmblyNo,e.stateCd,e.districtCd,e.asmblyName,e.category,e.asmblyNameL1,e.asmblyNameL2,e.categoryL1,e.categoryl2,e.effectiveFrom,e.effectiveTo,e.isActive,e.createdBy,e.createdDttm,e.modifiedBy,e.modifiedDttm,e.languagePneumonicL1,e.languagePneumonicL2,e.pcNo,e.prlmntNameL1,e.prlmntNameL2,e.prlmntCategoryL1,e.prlmntCategoryL2,e.acId];
            result = fnDbQuery("insertAssemblies", qryText, qryParam);
        })
        return result;
    }
    async insertParts(param: any) {
        let result: any;
        param.map((e:any) => {
            const qryText = "insert into politics.eci_parts(partId,stateCd,districtCd,acNumber,partNumber,partName) values ($1,$2,$3,$4,$5,$6)";
            const qryParam = [e.partId,e.stateCd.toUpperCase(),e.districtCd.toUpperCase(),e.acNumber,e.partNumber,e.partName];
            result = fnDbQuery("insertParts", qryText, qryParam);
        })
        return result;
    }
}