import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';

// export async function updateUserInfo(params) {
//   const userInstance = AV.User.current()
//   Object.keys(params).map(obj => {
//     userInstance.set(`${obj}`, params[obj]);
//     return obj
//   })
//   return new Promise((resolve, reject) => {
//     userInstance.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }

export async function getConfigById(params) {
  const queryConfig = new AV.Query('Config');
  return new Promise(resolve => {
    queryConfig.get(params._id).then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
    });
  })
}


export async function getCurUserProfile({ company_id }) {
  const queryUserProfile = new AV.Query('UserProfile');
  queryUserProfile.equalTo('user_id', AV.User.current());
  queryUserProfile.equalTo('company_id', AV.Object.createWithoutData('Company', company_id));

  return new Promise((resolve) => {
    queryUserProfile.find().then((res) => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  });
}

export async function createUserProfile({ company_id }) {
  const UserProfile = AV.Object.extend('UserProfile');
  const userprofileInstants = new UserProfile({
    user_id: AV.User.current(),
    company_id: AV.Object.createWithoutData('Company', company_id),
  });
  return new Promise((resolve, reject) => {
    userprofileInstants.save().then(res => {
      // 成功保存之后，执行其他逻辑
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }, error => {
      // 异常处理
      reject({
        result: error,
        code: -1,
        msg: 'failed',
      })
    });
  })
}

export async function updateUserInfo(params) {
  // 构建对象
  const userprofileInstance = AV.Object.createWithoutData('UserProfile', params.id);
  const { values } = params;
  Object.keys(values).map(obj => {
    userprofileInstance.set(`${obj}`, values[obj]);
    return obj;
  })

  return new Promise((resolve, reject) => {
    userprofileInstance.save().then(res => {
      // 成功保存之后，执行其他逻辑
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }, error => {
      // 异常处理
      reject({
        result: error,
        code: -1,
        msg: 'failed',
      })
    });
  })
}