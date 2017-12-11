function onTheList(list, email) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].email == email) {
      return true;
    }
  }
  return false
}

angular.module('theClub', ['ui.router', 'firebase'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: '/signin.html',
        controller: 'MainCtrl'
      })
      .state('theclub', {
        url: '/theclub',
        templateUrl: '/theclub.html',
        controller: 'MainCtrl'
      })
      $urlRouterProvider.otherwise('signin');
  }
])
.controller('MainCtrl',[
  '$scope',
  '$state',
  '$firebaseAuth',
  '$firebaseArray',
  function($scope, $state, $firebaseAuth, $firebaseArray) {
    let ref = firebase.database().ref();
    $scope.thelist = $firebaseArray(ref);

    $scope.authObj = $firebaseAuth()

    $scope.emailSignUp = function() {

    }

    $scope.emailSignIn = function() {
      if (onTheList($scope.thelist,$scope.email)) {
        $scope.authObj.$signInWithEmailAndPassword($scope.email,$scope.password)
        .then(function(firebaseUser) {
          console.log(firebaseUser)
          $state.go('theclub')
        })
        .catch(function(err){
          console.error("Authentication failed:", err);
          alert(err.message);
        });
      } else {
        $scope.authObj.$createUserWithEmailAndPassword()
        .then(function(firebaseUser) {
          console.log(firebaseUser);
          $state.go('theclub')
          // TODO add a step where they can choose a display name
          $scope.thelist.$add({name:firebaseUser.displayName, email: firebaseUser.email});
        })
        .catch(function(err){
          console.error("New user failed:", err);
          alert('Failed to sign up', err)
        });
      }


      $scope.email = '';
      $scope.password = '';
    };

    $scope.googleSign = function() {
      console.log($scope.authObj);
      let provider = new firebase.auth.GoogleAuthProvider();
      $scope.authObj.$signInWithPopup(provider)
      .then(function(result) {
        let user = result.user;
        //check if thelist contains user, if not, add them
        let member = {
          name: user.displayName,
          email: user.email
        }
        if (!onTheList($scope.thelist,member.email)) {
          $scope.thelist.$add(member);
        }
        $state.go('theclub')
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    $scope.signOut = function() {
      console.log('signing out');
      $scope.authObj.$signOut()
      $state.go('signin')
    };
  }])
