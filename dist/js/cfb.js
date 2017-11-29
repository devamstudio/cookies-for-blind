
//* 1. Language */
//* 2. Values */
//* 3. Main */
//* X. Helpers */

//* 1. Language */
var cfb_sessionStorages = [
	'data-font',
	'data-font-size',
	'data-font-kerning',
	'data-font-lineheight',
	'data-body-style',
	'data-images',
]
var cfb_lang = {
	ru : {
		eye_title : 'Включить режим для слабовидящих',
		panel : {
			triggers : {
				font : {
					title : 'Шрифт',
					data_name : 'data-font',
					variants : [
						{ title : 'Без засечек', data_value : 'sans-serif' },
						{ title : 'С засечками', data_value : 'serif' },
						{ title : 'Шрифт Брайля', data_value : 'braile' },
					]
				},
				font_size : {
					title : 'Размера шрифта',
					data_name : 'data-font-size',
					variants : [
						{ title : 'Обычный', data_value : 'normal' },
						{ title : 'Большой', data_value : 'big' },
						{ title : 'Очень большой', data_value : 'huge' },
					]
				},
				font_kerning : {
					title : 'Межбуквенное растояние',
					data_name : 'data-font-kerning',
					variants : [
						{ title : 'Обычный', data_value : 'normal' },
						{ title : 'Большой', data_value : 'big' },
						{ title : 'Очень большой', data_value : 'huge' },
					]
				},
				font_lineheight : {
					title : 'Растояние между строками',
					data_name : 'data-font-lineheight',
					variants : [
						{ title : 'Обычный', data_value : 'normal' },
						{ title : 'Большой', data_value : 'big' },
						{ title : 'Очень большой', data_value : 'huge' },
					]
				},
				body_style : {
					title : 'Цвет сайта',
					data_name : 'data-body-style',
					variants : [
						{ title : 'Черный на белом', data_value : 'black' },
						{ title : 'Белый на черном', data_value : 'white' },
					]
				},
				images : {
					title : 'Изображения',
					data_name : 'data-images',
					variants : [
						{ title : 'Включены', data_value : 'on' },
						{ title : 'ЧБ', data_value : 'bw' },
						{ title : 'Выключены', data_value : 'off' },
					]
				},
			},
			button_exit : 'Обычная версия',
		},
		
	}
}
//* 2. Values */
var trigger_id, panel_id


//* 3. Main */
function cfb_init(language)
{
	//test
	console.log(sessionStorage.getItem('cbf_io'))
	//test
	draw_eye(language);
	draw_panel(language);
	// Проверка включен ли
	cookies_io = sessionStorage.getItem('cbf_io');
	if (cookies_io != 'on') cfb_turn_off();
	else if(cookies_io == 'on') cfb_turn_on();
	// Проверка параметров
}

// Manipulation functions
function cfb_turn_on()
{
	trigger_id.removeClass('active')
	sessionStorage.setItem('cbf_io', 'on');
	panel_id.addClass('active')
	$('body').addClass('cfb_body')
	cfb_session_check();
}
function cfb_turn_off()
{
	trigger_id.addClass('active')
	
	panel_id.removeClass('active');
	$('body').removeClass('cfb_body');
	//deleteAllCookies();
}
// When options are selected
$('body').on('change', '.cfb_options', function(){
	var tmp_item = $(this).attr('data-watch');
	var tmp_value = $(this).val();
	//console.log(tmp_item);
	$('body').attr(tmp_item, tmp_value);
	sessionStorage.setItem(tmp_item, tmp_value);
	//console.log( sessionStorage.getItem(tmp_item) );
})
// Always check session storages
function cfb_session_check()
{
	for(var i = 0; i < cfb_sessionStorages.length; i++)
	{
		var tmp_item = sessionStorage.getItem(cfb_sessionStorages[i])
		console.log(i+': '+tmp_item)
		if( tmp_item != null )
		{
			$('body').attr(cfb_sessionStorages[i], tmp_item);
		}
	}
}


//* 4. Draws */
// Draw function
function draw_eye(language)
{
	$( document ).find('body').prepend('<div id="cfb_trigger" onclick="cfb_turn_on();" title="'+cfb_lang[language].eye_title+'">👁</div>')
	$( document ).find('body').append('<div class="btn btn-primary" onclick="deleteAllCookies();">Очистить куки</div>')
	trigger_id = $('#cfb_trigger')
}

function draw_panel(language)
{
	var tmp_base = cfb_lang[language].panel;
	$( document ).find('body').prepend('<div id="cfb_sidebar" role="navbar"></div>')
	// Loop in triggers
	for(var i = 0; i < Object.keys(tmp_base.triggers).length ; i++)
	{
		var tmp_current = Object.keys(tmp_base.triggers)[i]
		//console.log(tmp_current) //test
		$( '#cfb_sidebar' ).append('<div class="cbf_section_'+tmp_current+'"></div>')
		$( '.cbf_section_'+tmp_current ).append('<h5>'+tmp_base.triggers[tmp_current].title+'</h5><select data-watch="'+tmp_base.triggers[tmp_current].data_name+'" id="cfb_select_'+tmp_current+'" class="cfb_options"></select>')
		// Loop in trigger values
		//console.log(Object.keys(tmp_base.triggers[tmp_current]).length)
		for(var j = 0; j < tmp_base.triggers[tmp_current].variants.length ; j++)
		{
			var tmp_current_list = tmp_base.triggers[tmp_current].variants[j]
				$( '.cbf_section_'+tmp_current ).find('select').append('<option value="'+tmp_current_list.data_value+'">'+tmp_current_list.title+'</option>')
		}
	}
	$( '#cfb_sidebar' ).append('<button class="btn" onclick="cfb_turn_off();">'+tmp_base.button_exit+'</button>')
	panel_id = $('#cfb_sidebar')
}

//* X. Helpers */

function deleteAllCookies() {
    sessionStorage.clear();
	sessionStorage.setItem('cbf_io', 'off');
}



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrX2Nvb2tpZXMuanMiLCJjb29raWVzX2Zvcl9ibGluZC5qcyIsImRyYXdfcGF0dGVybnMuanMiLCJnZXR0ZXJfbl9zZXR0ZXIuanMiLCJsYW5ndWFnZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0tBO0FDQUE7QUNBQSIsImZpbGUiOiJjZmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCIvLyogMS4gTGFuZ3VhZ2UgKi9cclxuLy8qIDIuIFZhbHVlcyAqL1xyXG4vLyogMy4gTWFpbiAqL1xyXG4vLyogWC4gSGVscGVycyAqL1xyXG5cclxuLy8qIDEuIExhbmd1YWdlICovXHJcbnZhciBjZmJfc2Vzc2lvblN0b3JhZ2VzID0gW1xyXG5cdCdkYXRhLWZvbnQnLFxyXG5cdCdkYXRhLWZvbnQtc2l6ZScsXHJcblx0J2RhdGEtZm9udC1rZXJuaW5nJyxcclxuXHQnZGF0YS1mb250LWxpbmVoZWlnaHQnLFxyXG5cdCdkYXRhLWJvZHktc3R5bGUnLFxyXG5cdCdkYXRhLWltYWdlcycsXHJcbl1cclxudmFyIGNmYl9sYW5nID0ge1xyXG5cdHJ1IDoge1xyXG5cdFx0ZXllX3RpdGxlIDogJ9CS0LrQu9GO0YfQuNGC0Ywg0YDQtdC20LjQvCDQtNC70Y8g0YHQu9Cw0LHQvtCy0LjQtNGP0YnQuNGFJyxcclxuXHRcdHBhbmVsIDoge1xyXG5cdFx0XHR0cmlnZ2VycyA6IHtcclxuXHRcdFx0XHRmb250IDoge1xyXG5cdFx0XHRcdFx0dGl0bGUgOiAn0KjRgNC40YTRgicsXHJcblx0XHRcdFx0XHRkYXRhX25hbWUgOiAnZGF0YS1mb250JyxcclxuXHRcdFx0XHRcdHZhcmlhbnRzIDogW1xyXG5cdFx0XHRcdFx0XHR7IHRpdGxlIDogJ9CR0LXQtyDQt9Cw0YHQtdGH0LXQuicsIGRhdGFfdmFsdWUgOiAnc2Fucy1zZXJpZicgfSxcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQoSDQt9Cw0YHQtdGH0LrQsNC80LgnLCBkYXRhX3ZhbHVlIDogJ3NlcmlmJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRpdGxlIDogJ9Co0YDQuNGE0YIg0JHRgNCw0LnQu9GPJywgZGF0YV92YWx1ZSA6ICdicmFpbGUnIH0sXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmb250X3NpemUgOiB7XHJcblx0XHRcdFx0XHR0aXRsZSA6ICfQoNCw0LfQvNC10YDQsCDRiNGA0LjRhNGC0LAnLFxyXG5cdFx0XHRcdFx0ZGF0YV9uYW1lIDogJ2RhdGEtZm9udC1zaXplJyxcclxuXHRcdFx0XHRcdHZhcmlhbnRzIDogW1xyXG5cdFx0XHRcdFx0XHR7IHRpdGxlIDogJ9Ce0LHRi9GH0L3Ri9C5JywgZGF0YV92YWx1ZSA6ICdub3JtYWwnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGl0bGUgOiAn0JHQvtC70YzRiNC+0LknLCBkYXRhX3ZhbHVlIDogJ2JpZycgfSxcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQntGH0LXQvdGMINCx0L7Qu9GM0YjQvtC5JywgZGF0YV92YWx1ZSA6ICdodWdlJyB9LFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Zm9udF9rZXJuaW5nIDoge1xyXG5cdFx0XHRcdFx0dGl0bGUgOiAn0JzQtdC20LHRg9C60LLQtdC90L3QvtC1INGA0LDRgdGC0L7Rj9C90LjQtScsXHJcblx0XHRcdFx0XHRkYXRhX25hbWUgOiAnZGF0YS1mb250LWtlcm5pbmcnLFxyXG5cdFx0XHRcdFx0dmFyaWFudHMgOiBbXHJcblx0XHRcdFx0XHRcdHsgdGl0bGUgOiAn0J7QsdGL0YfQvdGL0LknLCBkYXRhX3ZhbHVlIDogJ25vcm1hbCcgfSxcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQkdC+0LvRjNGI0L7QuScsIGRhdGFfdmFsdWUgOiAnYmlnJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRpdGxlIDogJ9Ce0YfQtdC90Ywg0LHQvtC70YzRiNC+0LknLCBkYXRhX3ZhbHVlIDogJ2h1Z2UnIH0sXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmb250X2xpbmVoZWlnaHQgOiB7XHJcblx0XHRcdFx0XHR0aXRsZSA6ICfQoNCw0YHRgtC+0Y/QvdC40LUg0LzQtdC20LTRgyDRgdGC0YDQvtC60LDQvNC4JyxcclxuXHRcdFx0XHRcdGRhdGFfbmFtZSA6ICdkYXRhLWZvbnQtbGluZWhlaWdodCcsXHJcblx0XHRcdFx0XHR2YXJpYW50cyA6IFtcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQntCx0YvRh9C90YvQuScsIGRhdGFfdmFsdWUgOiAnbm9ybWFsJyB9LFxyXG5cdFx0XHRcdFx0XHR7IHRpdGxlIDogJ9CR0L7Qu9GM0YjQvtC5JywgZGF0YV92YWx1ZSA6ICdiaWcnIH0sXHJcblx0XHRcdFx0XHRcdHsgdGl0bGUgOiAn0J7Rh9C10L3RjCDQsdC+0LvRjNGI0L7QuScsIGRhdGFfdmFsdWUgOiAnaHVnZScgfSxcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJvZHlfc3R5bGUgOiB7XHJcblx0XHRcdFx0XHR0aXRsZSA6ICfQptCy0LXRgiDRgdCw0LnRgtCwJyxcclxuXHRcdFx0XHRcdGRhdGFfbmFtZSA6ICdkYXRhLWJvZHktc3R5bGUnLFxyXG5cdFx0XHRcdFx0dmFyaWFudHMgOiBbXHJcblx0XHRcdFx0XHRcdHsgdGl0bGUgOiAn0KfQtdGA0L3Ri9C5INC90LAg0LHQtdC70L7QvCcsIGRhdGFfdmFsdWUgOiAnYmxhY2snIH0sXHJcblx0XHRcdFx0XHRcdHsgdGl0bGUgOiAn0JHQtdC70YvQuSDQvdCwINGH0LXRgNC90L7QvCcsIGRhdGFfdmFsdWUgOiAnd2hpdGUnIH0sXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRpbWFnZXMgOiB7XHJcblx0XHRcdFx0XHR0aXRsZSA6ICfQmNC30L7QsdGA0LDQttC10L3QuNGPJyxcclxuXHRcdFx0XHRcdGRhdGFfbmFtZSA6ICdkYXRhLWltYWdlcycsXHJcblx0XHRcdFx0XHR2YXJpYW50cyA6IFtcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQktC60LvRjtGH0LXQvdGLJywgZGF0YV92YWx1ZSA6ICdvbicgfSxcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQp9CRJywgZGF0YV92YWx1ZSA6ICdidycgfSxcclxuXHRcdFx0XHRcdFx0eyB0aXRsZSA6ICfQktGL0LrQu9GO0YfQtdC90YsnLCBkYXRhX3ZhbHVlIDogJ29mZicgfSxcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRidXR0b25fZXhpdCA6ICfQntCx0YvRh9C90LDRjyDQstC10YDRgdC40Y8nLFxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdH1cclxufVxyXG4vLyogMi4gVmFsdWVzICovXHJcbnZhciB0cmlnZ2VyX2lkLCBwYW5lbF9pZFxyXG5cclxuXHJcbi8vKiAzLiBNYWluICovXHJcbmZ1bmN0aW9uIGNmYl9pbml0KGxhbmd1YWdlKVxyXG57XHJcblx0Ly90ZXN0XHJcblx0Y29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnY2JmX2lvJykpXHJcblx0Ly90ZXN0XHJcblx0ZHJhd19leWUobGFuZ3VhZ2UpO1xyXG5cdGRyYXdfcGFuZWwobGFuZ3VhZ2UpO1xyXG5cdC8vINCf0YDQvtCy0LXRgNC60LAg0LLQutC70Y7Rh9C10L0g0LvQuFxyXG5cdGNvb2tpZXNfaW8gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjYmZfaW8nKTtcclxuXHRpZiAoY29va2llc19pbyAhPSAnb24nKSBjZmJfdHVybl9vZmYoKTtcclxuXHRlbHNlIGlmKGNvb2tpZXNfaW8gPT0gJ29uJykgY2ZiX3R1cm5fb24oKTtcclxuXHQvLyDQn9GA0L7QstC10YDQutCwINC/0LDRgNCw0LzQtdGC0YDQvtCyXHJcbn1cclxuXHJcbi8vIE1hbmlwdWxhdGlvbiBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY2ZiX3R1cm5fb24oKVxyXG57XHJcblx0dHJpZ2dlcl9pZC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuXHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjYmZfaW8nLCAnb24nKTtcclxuXHRwYW5lbF9pZC5hZGRDbGFzcygnYWN0aXZlJylcclxuXHQkKCdib2R5JykuYWRkQ2xhc3MoJ2NmYl9ib2R5JylcclxuXHRjZmJfc2Vzc2lvbl9jaGVjaygpO1xyXG59XHJcbmZ1bmN0aW9uIGNmYl90dXJuX29mZigpXHJcbntcclxuXHR0cmlnZ2VyX2lkLmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cdFxyXG5cdHBhbmVsX2lkLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2NmYl9ib2R5Jyk7XHJcblx0Ly9kZWxldGVBbGxDb29raWVzKCk7XHJcbn1cclxuLy8gV2hlbiBvcHRpb25zIGFyZSBzZWxlY3RlZFxyXG4kKCdib2R5Jykub24oJ2NoYW5nZScsICcuY2ZiX29wdGlvbnMnLCBmdW5jdGlvbigpe1xyXG5cdHZhciB0bXBfaXRlbSA9ICQodGhpcykuYXR0cignZGF0YS13YXRjaCcpO1xyXG5cdHZhciB0bXBfdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdC8vY29uc29sZS5sb2codG1wX2l0ZW0pO1xyXG5cdCQoJ2JvZHknKS5hdHRyKHRtcF9pdGVtLCB0bXBfdmFsdWUpO1xyXG5cdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odG1wX2l0ZW0sIHRtcF92YWx1ZSk7XHJcblx0Ly9jb25zb2xlLmxvZyggc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0bXBfaXRlbSkgKTtcclxufSlcclxuLy8gQWx3YXlzIGNoZWNrIHNlc3Npb24gc3RvcmFnZXNcclxuZnVuY3Rpb24gY2ZiX3Nlc3Npb25fY2hlY2soKVxyXG57XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGNmYl9zZXNzaW9uU3RvcmFnZXMubGVuZ3RoOyBpKyspXHJcblx0e1xyXG5cdFx0dmFyIHRtcF9pdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjZmJfc2Vzc2lvblN0b3JhZ2VzW2ldKVxyXG5cdFx0Y29uc29sZS5sb2coaSsnOiAnK3RtcF9pdGVtKVxyXG5cdFx0aWYoIHRtcF9pdGVtICE9IG51bGwgKVxyXG5cdFx0e1xyXG5cdFx0XHQkKCdib2R5JykuYXR0cihjZmJfc2Vzc2lvblN0b3JhZ2VzW2ldLCB0bXBfaXRlbSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8qIDQuIERyYXdzICovXHJcbi8vIERyYXcgZnVuY3Rpb25cclxuZnVuY3Rpb24gZHJhd19leWUobGFuZ3VhZ2UpXHJcbntcclxuXHQkKCBkb2N1bWVudCApLmZpbmQoJ2JvZHknKS5wcmVwZW5kKCc8ZGl2IGlkPVwiY2ZiX3RyaWdnZXJcIiBvbmNsaWNrPVwiY2ZiX3R1cm5fb24oKTtcIiB0aXRsZT1cIicrY2ZiX2xhbmdbbGFuZ3VhZ2VdLmV5ZV90aXRsZSsnXCI+8J+RgTwvZGl2PicpXHJcblx0JCggZG9jdW1lbnQgKS5maW5kKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25jbGljaz1cImRlbGV0ZUFsbENvb2tpZXMoKTtcIj7QntGH0LjRgdGC0LjRgtGMINC60YPQutC4PC9kaXY+JylcclxuXHR0cmlnZ2VyX2lkID0gJCgnI2NmYl90cmlnZ2VyJylcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd19wYW5lbChsYW5ndWFnZSlcclxue1xyXG5cdHZhciB0bXBfYmFzZSA9IGNmYl9sYW5nW2xhbmd1YWdlXS5wYW5lbDtcclxuXHQkKCBkb2N1bWVudCApLmZpbmQoJ2JvZHknKS5wcmVwZW5kKCc8ZGl2IGlkPVwiY2ZiX3NpZGViYXJcIiByb2xlPVwibmF2YmFyXCI+PC9kaXY+JylcclxuXHQvLyBMb29wIGluIHRyaWdnZXJzXHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRtcF9iYXNlLnRyaWdnZXJzKS5sZW5ndGggOyBpKyspXHJcblx0e1xyXG5cdFx0dmFyIHRtcF9jdXJyZW50ID0gT2JqZWN0LmtleXModG1wX2Jhc2UudHJpZ2dlcnMpW2ldXHJcblx0XHQvL2NvbnNvbGUubG9nKHRtcF9jdXJyZW50KSAvL3Rlc3RcclxuXHRcdCQoICcjY2ZiX3NpZGViYXInICkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2JmX3NlY3Rpb25fJyt0bXBfY3VycmVudCsnXCI+PC9kaXY+JylcclxuXHRcdCQoICcuY2JmX3NlY3Rpb25fJyt0bXBfY3VycmVudCApLmFwcGVuZCgnPGg1PicrdG1wX2Jhc2UudHJpZ2dlcnNbdG1wX2N1cnJlbnRdLnRpdGxlKyc8L2g1PjxzZWxlY3QgZGF0YS13YXRjaD1cIicrdG1wX2Jhc2UudHJpZ2dlcnNbdG1wX2N1cnJlbnRdLmRhdGFfbmFtZSsnXCIgaWQ9XCJjZmJfc2VsZWN0XycrdG1wX2N1cnJlbnQrJ1wiIGNsYXNzPVwiY2ZiX29wdGlvbnNcIj48L3NlbGVjdD4nKVxyXG5cdFx0Ly8gTG9vcCBpbiB0cmlnZ2VyIHZhbHVlc1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0bXBfYmFzZS50cmlnZ2Vyc1t0bXBfY3VycmVudF0pLmxlbmd0aClcclxuXHRcdGZvcih2YXIgaiA9IDA7IGogPCB0bXBfYmFzZS50cmlnZ2Vyc1t0bXBfY3VycmVudF0udmFyaWFudHMubGVuZ3RoIDsgaisrKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgdG1wX2N1cnJlbnRfbGlzdCA9IHRtcF9iYXNlLnRyaWdnZXJzW3RtcF9jdXJyZW50XS52YXJpYW50c1tqXVxyXG5cdFx0XHRcdCQoICcuY2JmX3NlY3Rpb25fJyt0bXBfY3VycmVudCApLmZpbmQoJ3NlbGVjdCcpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicrdG1wX2N1cnJlbnRfbGlzdC5kYXRhX3ZhbHVlKydcIj4nK3RtcF9jdXJyZW50X2xpc3QudGl0bGUrJzwvb3B0aW9uPicpXHJcblx0XHR9XHJcblx0fVxyXG5cdCQoICcjY2ZiX3NpZGViYXInICkuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnRuXCIgb25jbGljaz1cImNmYl90dXJuX29mZigpO1wiPicrdG1wX2Jhc2UuYnV0dG9uX2V4aXQrJzwvYnV0dG9uPicpXHJcblx0cGFuZWxfaWQgPSAkKCcjY2ZiX3NpZGViYXInKVxyXG59XHJcblxyXG4vLyogWC4gSGVscGVycyAqL1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlQWxsQ29va2llcygpIHtcclxuICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnY2JmX2lvJywgJ29mZicpO1xyXG59IiwiIiwiIiwiIl19
