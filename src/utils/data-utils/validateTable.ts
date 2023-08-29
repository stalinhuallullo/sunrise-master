import { columns } from '@utils/component-utils/tableColumns';
import {
  BasicInfoFile,
  InfoTableMembers
} from 'interfaces/boxToDrag-interface';
import patterns from './patternRegex';

export const validateHeaders = (
  arrayMembers: BasicInfoFile,
  setArrayBadHeaders: any,
  setArrayGoodHeaders: any
) => {
  let validHeaders: any[] = [];
  arrayMembers.newData.forEach((a) => {
    const headerWithoutKey = Object.keys(a).filter((a) => {
      return a !== 'key';
    });
    validHeaders = headerWithoutKey;
  });

  validHeaders.forEach((headerExcel: any, index: number) => {
    try {
      if (headerExcel !== columns[index].dataIndex!) {
        setArrayBadHeaders((prevArray: any) => [...prevArray, headerExcel]);
        setArrayGoodHeaders((prevArray: any) => [
          ...prevArray,
          columns[index].dataIndex!
        ]);
      }
    } catch (e) {
      return e
    }
  });
};

export const validateRows = (arrayMembers: BasicInfoFile, setBadRowFormat: any) => {
  arrayMembers.newData.forEach((user: InfoTableMembers) => {
    try {
      if (!user.Name) {
        setBadRowFormat((prev: string[]) => [...prev, 'Name']);
      }
      if (user.Cohort !== '') {
        const arrayCohort = user.Cohort.split('::');
        arrayCohort.forEach((cohort) => {
          if (cohort.includes(':') && cohort.split(':').length > 2) {
            setBadRowFormat((prev: string[]) => [...prev, 'Cohort']);
          }
          if (!cohort.includes(':') && !patterns.invalidString.test(cohort)) {
            setBadRowFormat((prev: string[]) => [...prev, 'Cohort']);
          }
        });
      }
      if (user['Managers Email Address'] !== '' && user['Managers Email Address'] !== undefined) {
        const arrayEmail = user['Managers Email Address']!.split('::');
        arrayEmail.forEach((email) => {
          if (!patterns.invalidEmail.test(email)) {
            setBadRowFormat((prev: string[]) => [...prev, 'Managers Email Address']);
          }
        });
      }
      if (!patterns.invalidEmail.test(user['Email Address']!) && user['Email Address']! !== undefined) {
        setBadRowFormat((prev: string[]) => [...prev, 'Email Address']);
      }
      if (user.Skillset !== '' && user.Skillset !== undefined) {
        if (!patterns.invalidString.test(user.Skillset)) {
          setBadRowFormat((prev: string[]) => [...prev, 'Skillset']);
        }
      }
      if (user.Budget !== undefined) {
        if (!patterns.invalidBudget.test(user.Budget + '')) {
          setBadRowFormat((prev: string[]) => [...prev, 'Budget']);
        }
      }
    } catch (e) {
      return e
    }
  });
};

// manager can't be a manager of himself
export const validateDuplicateManagerEmail = (
  arrayMembers: BasicInfoFile,
  setArrayDuplicateManagerEmail: any
) => {

  const arrayManagersEmail: (string | undefined)[] = [];

  arrayMembers.newData.forEach((user: InfoTableMembers) => {

    const listManagerEmail: (string | undefined)[] = user['Managers Email Address'] ? user['Managers Email Address']!.split('::') : []

    if (listManagerEmail.length > 1 && listManagerEmail.includes(user['Email Address'])) {
      arrayManagersEmail.push(user['Email Address'])
    } else {
      if (
        user['Managers Email Address'] !== undefined &&
        patterns.invalidEmail.test(user['Managers Email Address']) &&
        user['Managers Email Address'] === user['Email Address']
      ) {
        arrayManagersEmail.push(user['Managers Email Address']);
      }
    }

  });

  const uniqueEmails = arrayManagersEmail.filter(
    (e, i) => arrayManagersEmail.indexOf(e) === i
  );
  setArrayDuplicateManagerEmail(uniqueEmails);
};

export const validateDuplicateEmails = (
  arrayMembers: BasicInfoFile,
  setArrayDuplicateEmails: any
) => {
  const arrayEmailAddress: (string | undefined)[] = [];

  const allEmails = arrayMembers.newData.map((user: InfoTableMembers) => {
    return user['Email Address']
  })

  arrayMembers.newData.forEach((user: InfoTableMembers) => {
    const sameEmails = allEmails.filter((item, index) => allEmails.indexOf(item) !== index)
    if (
      user['Email Address'] !== undefined &&
      patterns.invalidEmail.test(user['Email Address']) &&
      sameEmails.includes(user['Email Address']) === true
    ) {
      arrayEmailAddress.push(user['Email Address']);
    }
  });

  const uniqueEmails = arrayEmailAddress.filter(
    (e, i) => arrayEmailAddress.indexOf(e) === i
  );
  setArrayDuplicateEmails(uniqueEmails);
}