
var module = angular.module('adminapp', [])
  .filter('filter_active', function() {
    return function(input) {
        return input?'ACTIVE':'disabled'
    }
});

(function(module){
    function addFactory(module, key, getURL, getData, getValues){
        module.factory(key, function($http, $q) {
            return {
              getAllItems: function(){
                var deferred = $q.defer();
                $http.post(getURL, getData
                ).success(function(data){
                  deferred.resolve(getValues(data));
                }).error(function(){
                  deferred.reject("An error occured while fetching items");
                });
              return deferred.promise;
            }}
        });
    }

    addFactory(module, "UsedContent", "/admin/api/activecontent", {}, function(data){return data});
    addFactory(module, "Static", "/admin/api/content", {}, function(data){return data.Content?data.Content.Static:[]});
})(module);



function StaticContentListCtrl($scope, Static, UsedContent) {
  $scope.contents = [];
  $scope.pages = [];
  $scope.missingKeys = [];
  $scope.allMissingKeys = '';
  $scope.unusedKeys = false;

  var content = Static.getAllItems();
  content.then(function(data){
      _.map(data, function(el){
          el.escapedKey = encodeURIComponent(el.key);
          return el
      });
      $scope.contents = data;
      $scope.pages = _.sortBy(_.uniq(_.map(_.pluck(data, "key"), function(item){return item.split(".")[0]})), function(e){return e});
  });
  UsedContent.getAllItems().then(function(usedData){
        content.then(function(data){
            var usedKeys = [];
            _.each(data, function(item){
                if(_.contains(usedData, item.key)){
                    item.active = true;
                    usedKeys.push(item.key);
                } else {
                    $scope.unusedKeys = true;
                }
            });
            $scope.missingKeys = _.difference(usedData, usedKeys);
            $scope.allMissingKeys = _.map($scope.missingKeys, encodeURIComponent).join('&key=');
        });
  });

  $scope.query = function (item){
        var key = item.key.toLowerCase();
        return    (!$scope.queryName || !!~key.indexOf($scope.queryName.toLowerCase()))
               && (!$scope.queryPage || key.indexOf($scope.queryPage.toLowerCase())==0)
               && (!$scope.queryUnused || !item.active)
               && (!$scope.queryContent || !!~item.value.toLowerCase().indexOf($scope.queryContent.toLowerCase()));
  };
}
