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