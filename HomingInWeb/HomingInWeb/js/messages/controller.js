/* global angular */
(function () {
    "use strict";

    var app = angular.module('homingApp.messages.controllers', []);

    app.controller('messagesController', ['$scope', '$http', '$location', '$rootScope', '$interval', '$timeout',
        function ($scope, $http, $location, $rootScope, $interval, $timeout) {
            console.log("messagesController Init");

            if (!$rootScope.IsLogged()) {
                $location.path("/login");
                return;
            }

            if ($rootScope.currentUser.IsAgent && !$rootScope.currentUser.IsPremium) {
                location.replace("/pricing");
                return;
            }

            $scope.conversations = [];
            $scope.userMessage = '';
            $scope.activeConversation = null;

            var refreshMessagesTimeout = null;

            $scope.$on('$destroy', function () {
                $interval.cancel(refreshMessagesTimeout);
            })

            $scope.SelectConversation = function (conversation) {
                $scope.activeConversation = conversation;
                $scope.GetConversationMessage(conversation);

                $scope.userMessage = '';
                $scope.focusUserMessage();

                $interval.cancel(refreshMessagesTimeout);

                refreshMessagesTimeout = $interval(function () {
                    $scope.GetConversationMessage($scope.activeConversation);
                }, 30000);

                $scope.scrollMessagesToEnd();
            }

            $scope.GetConversationMessage = function (conversation) {

                var propertyId = $scope.activeConversation.Estimate.Id;
                var userId = $scope.activeConversation.User.Id;

                $http.get('/message/' + propertyId + '/' + userId).then(function (response) {

                    conversation.Messages = conversation.Messages.filter(function (message) {
                        return message.Id;
                    });

                    var conversaionMessageIds = conversation.Messages.map(function (message) {
                        return message.Id;
                    });

                    var messages = response.data.Message.map(function (message) {
                        var dateInt = parseInt(message.Date.substr(6, message.Date.lastIndexOf('/')))
                        message.Date = new Date(dateInt);
                        message.IsMy = $rootScope.currentUser.Id == message.FromUserId;
                        return message;
                    })

                    var uniqueMessages = messages.filter(function (message) {
                        return conversaionMessageIds.lastIndexOf(message.Id) < 0;
                    })

                    conversation.Messages = conversation.Messages.concat(uniqueMessages);


                    $scope.scrollMessagesToEnd();
                })
            }

            $scope.GetMessageChats = function () {
                $http.get('/messageChats').then(function (response) {

                    angular.forEach(response.data.Chats, function (chat) {
                        $scope.addConversation(chat.User, chat.Estimate);
                    })

                    if (!$scope.activeConversation) {
                        $scope.SelectConversation($scope.conversations[0]);
                    }
                })
            }

            $scope.addConversation = function (user, estimate) {

                var dateInt = parseInt(estimate.CreatedOn.substr(6, estimate.CreatedOn.lastIndexOf('/')))
                estimate.CreatedOn = new Date(dateInt);

                $scope.conversations.push({
                    User: user,
                    Estimate: estimate,
                    Messages: []
                })
            }

            $scope.SendMessage = function () {
                if ($scope.userMessage) {

                    var data = {
                        Body: $scope.userMessage,
                        Date: new Date()
                    }
                    var propertyId = $scope.activeConversation.Estimate.Id;
                    var userId = $scope.activeConversation.User.Id;

                    $http.post('/message/' + propertyId  + '/' + userId, data).then(function (response) {
                        console.log('Message POST:', response.data);
                        $scope.GetConversationMessage($scope.activeConversation);
                    })

                    $scope.activeConversation.Messages.push({
                        Body: $scope.userMessage,
                        IsMy: true
                    })
                    $scope.userMessage = '';

                    $scope.scrollMessagesToEnd();
                }
            }

            $scope.focusUserMessage = function () {
                angular.element('#user-message-input').focus();
            }

            $scope.scrollMessagesToEnd = function () {
                $timeout(function() {
                    var el = angular.element('.chat-wrapper')[0];
                    el.scrollTop = el.scrollHeight - el.offsetHeight;
                });
            }

            $scope.Init = function () {
                if ($rootScope.NewConversation) {
                    $scope.addConversation($rootScope.NewConversation.User, $rootScope.NewConversation.Estimate);
                    $rootScope.NewConversation = null;
                }

                $scope.GetMessageChats();
            };
            $scope.Init();

        }
    ]);
})();

