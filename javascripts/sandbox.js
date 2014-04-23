define(function(sandbox) {
	function Sandbox() {

		this.toString = function() {
			return 'Sandbox';
		};

		var allFunctionScope = "private but acccesible from all inner functions";

		console.log('Sandbox Construc');
		console.log('this=' + this);

		function playInnerPrivate() {
			console.log('playInnerPrivate');
			console.log('this=' + this);
			console.log('this.iAmPublic=' + this.iAmPublic);
			console.log('allFunctionScope=' + allFunctionScope);
		};

		var playInnerPublic = function() {
			console.log('playInnerPublic');
			console.log('this=' + this);
			console.log('this.iAmPublic=' + this.iAmPublic);
			console.log('allFunctionScope=' + allFunctionScope);
		};

		this.playInnerPrivaliged = function() {
			console.log('playInnerPrivaliged');
			console.log('this=' + this);
			console.log('this.iAmPublic=' + this.iAmPublic);
			console.log('allFunctionScope=' + allFunctionScope);
		};

		this.play = function() {

			this.iAmPublic = "I am public";

			console.log('this.iAmPublic=' + this.iAmPublic);
			console.log('this=' + this);
			var closureFunc = function() {
				console.log('Closure func access');
				console.log('this=' + this);
				console.log('this.iAmPublic=' + this.iAmPublic);
			};

			closureFunc.call();

			console.log('##############################');
			this.playInnerPrivaliged();
			console.log('##############################');
			playInnerPublic();
			console.log('##############################');
			playInnerPrivate();
		};
	};

	return Sandbox;
});
