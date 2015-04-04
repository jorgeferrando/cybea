angular.module('app').directive('validateEquals', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.validateEquals) {
                console.error('validateEquals expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.validateEquals, function (value) {
                // Only compare values if the second ctrl has a value.
                if (model.$viewValue !== undefined && model.$viewValue !== '') {
                    model.$setValidity('validateEquals', value === model.$viewValue);
                }
            });
            model.$parsers.push(function (value) {
                // Mute the nxEqual error if the second ctrl is empty.
                if (value === undefined || value === '') {
                    model.$setValidity('validateEquals', true);
                    return value;
                }
                var isValid = value === scope.$eval(attrs.validateEquals);
                model.$setValidity('validateEquals', isValid);
                return isValid ? value : undefined;
            });
        }
    };
});