target = cv

all: $(target).pdf

$(target).pdf: *.tex Makefile
	pdflatex --shell-escape --synctex=1 $(target)
ifeq ($(shell uname), Darwin)
	open /Applications/Skim.app $(target).pdf
endif
ifeq ($(shell uname), Linux)
	evince $(target).pdf > /dev/null 2>&1 &
endif

clean:
	rm -f *.bak
	rm -f *~
	rm -f $(target).pdf *.log *.aux *.bbl *.blg \#* *.dvi *.gz *.out
