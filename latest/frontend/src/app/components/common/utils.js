import moment from 'moment';
import _ from 'lodash';

export function formatUptime(uptime) {
  const diff = moment.duration(moment().diff(uptime));
  let units = 0;
  if(diff._data.years != 0) {
    units = Math.round(diff.asYears());
    if(units == 1) {
      return "a year";
    } else {
      return units + " years";
    }
  } else if (diff._data.months >= 3) {
    units = Math.round(diff.asMonths());
    if(units == 1) {
      return "a month";
    } else {
      return units + " months";
    }
  } else if (diff._data.months < 3 && diff._data.months > 0) {
    units = Math.round(diff.asWeeks());
    if(units == 1) {
      return "a week";
    } else {
      return units + " weeks";
    }
  } else if (diff._data.days != 0) {
    units = Math.round(diff.asDays());
    if(units == 1) {
      return "a day";
    } else {
      return units + " days";
    }
  } else if (diff._data.hours != 0) {
    units = Math.round(diff.asHours());
    if(units == 1) {
      return "an hour";
    } else {
      return units + " hours";
    }
  } else {
    units = Math.round(diff.asMinutes) + " minutes";
    if(units == 1) {
      return "a minute";
    } else {
      return !isNaN(units) ? units + " minutes" : "-";
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function trimAppImage(appImage) {
  let result = '';
  if(appImage) {
    result = appImage.split('/')[1];
  }
  return result;
}

export function shortenAppImage(appImage) {
  if(appImage && appImage.length >= 20) {
    return appImage.slice(0,12) + "..." + appImage.slice(-5);
  } else {
    return appImage;
  }
}


export function containsSpecialCharacter(input) {
  return /[\$!@#%\^&\*\(\)\~`\{\}\|\[\]]/.test(input)
}

export function validateAppInputFields(appName, appExec, appImage, instancesNumber, existingApplications) {
  if(!appName || !appExec || !appImage) {
    return({error: true, message: 'all', appName: appName, appExec: appExec, appImage: appImage });
  } else if (existingApplications.includes(appName)) {
    return({error: true, message: 'existing_name'});
  } else if (containsSpecialCharacter(appName)) {
    return({error: true, message: 'use_of_special_characters'});
  } else if (isNaN(instancesNumber)) {
    return({error: true, message: 'not_a_number'});
  } else {
    return({error: false});
  }
}

export function appNameDynamicValidation(appName, existingApplications) {
  if (existingApplications.includes(appName) || containsSpecialCharacter(appName)) {
    return({error: true, message: 'use_of_special_characters'});
  } else {
    return({error: false});
  }
}

export function instanceCountDynamicValidation(number) {
  if (isNaN(number)) {
    return({error: true, message: 'not_a_number'});
  } else {
    return({error: false});

  }
}

//added from previous utils.js, updated after add_application_grid_view branch via feature/phase_1 branch by Catalin (charlietango)
export function determineServiceStatus(allApplications, serviceApplications) {
  const filteredApplications = _.filter(allApplications, (application) => _.includes(serviceApplications, application._id));
  let result = '';
  if (filteredApplications.length > 0) {
    if(_.filter(filteredApplications, application => !application.status).length > 0) {
      result = 'Unknown';
    } else if (_.filter(filteredApplications, (application) => application.status.toLowerCase() !== 'deployed').length > 0) {
      result = 'Undeployed';
    } else {
      result = 'Deployed';
    }
  }
  return result;
}

export function determineServiceAvailability(allApplications, serviceApplications) {
  const filteredApplications = _.filter(allApplications, (application) => _.includes(serviceApplications, application._id));
  if (filteredApplications.length == 0) {
    return "-";
  } else {
    let appErrorsSum = 0;
    _.each(filteredApplications, (application) => {
      if(!isNaN(application.errorCount)) {
        appErrorsSum += application.errorCount;
      }
    });
    return appErrorsSum == 0 ? 0 : appErrorsSum / filteredApplications.length;
  }
}

export function getNumberOfAppsByType(allApplications, serviceApplications, type) {
  const filteredApplications = _.filter(allApplications, (application) => _.includes(serviceApplications, application._id));
  if (filteredApplications.length == 0) {
    return 0;
  } else {
    return _.filter(filteredApplications, (application) => _.includes(application, type)).length;
  }
}

export function determineServiceInstancesNumber(allApplications, serviceApplications) {
  const filteredApplications = _.filter(allApplications, (application) => _.includes(serviceApplications, application._id));
  if (filteredApplications.length == 0) {
    return 0;
  } else {
    return _.sumBy(filteredApplications, 'instances');
  }
}
